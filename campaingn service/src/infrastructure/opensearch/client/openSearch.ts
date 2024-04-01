import { ApiResponse, Client } from '@opensearch-project/opensearch';
import { OPS_INDEX } from '../constants/constant';
import { AwsSigv4Signer } from '@opensearch-project/opensearch/aws';
import { AWSError, Credentials } from 'aws-sdk';
import * as AWS from 'aws-sdk';
//import client from '../index';

export class OpenSearch {
  private readonly client: Client;
  constructor() {
    this.client = this.client;
  }

  async initClient() {
    const client = this.inicializedClient();
    return client;
  }

  async inicializedClient(): Promise<Client> {
    // console.log(AWS.config);
    // AWS.config.update({ region: 'us-east-1' });
    const options = {
      ...(process.env.ENV_EXEC_CONF !== 'development_local'
        ? AwsSigv4Signer({
            region: process.env.APP_OPS_REGION ?? 'us-east-2',
            getCredentials: async (): Promise<Credentials> => {
              return new Promise((resolve, reject) => {
                AWS.config.getCredentials(
                  (err: AWSError, credentials: Credentials | null) => {
                    if (err) {
                      reject(err);
                    } else {
                      if (!credentials) {
                        reject(new Error('Credentials not found'));
                      } else {
                        resolve(credentials);
                      }
                    }
                  },
                );
              });
            },
          })
        : {}),
      node: process.env.APP_OPS_ENDPOINT,
    };
    const clientOp = new Client(options);
    return clientOp;
  }

  async createIndexes(): Promise<void> {
    const indexes = OPS_INDEX;
    const client = this.inicializedClient();
    for (const indexName of indexes) {
      await (
        await client
      ).indices
        .create({
          index: indexName,
          body: this.getIndexSettings(indexName),
        })
        .then((response: ApiResponse) => {
          console.log(`Index '${indexName}' created`, response.body);
        })
        .catch((error: any) => {
          console.log(`Error creating index '${indexName}'`, error);
        });
    }
  }

  private getIndexSettings(indexName: string): any {
    if (indexName === 'person') {
      return {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
          index: {
            analysis: {
              analyzer: {
                default: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'asciifolding', 'stop', 'porter_stem'],
                },
              },
            },
            refresh_interval: '1s',
            max_result_window: 100000,
            max_inner_result_window: 100000,
            max_rescore_window: 100000,
          },
        },
        mappings: {
          properties: {
            id: { type: 'text' },
            name: { type: 'text' },
            personInfo: { type: 'text' },
          },
        },
      };
    }
    if (indexName === 'company') {
      return {
        settings: {
          number_of_shards: 1,
          number_of_replicas: 1,
          index: {
            analysis: {
              analyzer: {
                default: {
                  type: 'custom',
                  tokenizer: 'standard',
                  filter: ['lowercase', 'asciifolding', 'stop', 'porter_stem'],
                },
              },
            },
            refresh_interval: '1s',
            max_result_window: 100000,
            max_inner_result_window: 100000,
            max_rescore_window: 100000,
          },
        },
        mappings: {
          properties: {
            id: { type: 'text' },
            name: { type: 'text' },
            companyInfo: { type: 'text' },
          },
        },
      };
    }
  }

  async indexEntity(entity: any, indexName: string): Promise<unknown> {
    return await (
      await this.initClient()
    ).index({
      index: indexName,
      body: entity,
      id: entity.id,
      refresh: true,
    });
  }

  async reindex(sourceIndex: string, destinationIndex: string): Promise<void> {
    const client = await this.initClient();
    try {
      // delete destinationIndex if exits
      await client.indices.delete({
        index: destinationIndex,
        ignore_unavailable: true,
      });

      // Create destination index
      await client.indices.create({ index: destinationIndex });

      // Re-index the docs
      await client.reindex({
        body: {
          source: { index: sourceIndex },
          dest: { index: destinationIndex },
        },
        refresh: true,
      });
      console.log(
        `Re-indexación de ${sourceIndex} a ${destinationIndex} completada.`,
      );
    } catch (error) {
      console.error(`Error durante la re-indexación: ${error}`);
      throw error;
    }
  }

  async searchByName(
    indexName: string,
    searchTerm: string,
    tenantId: string,
  ): Promise<any> {
    try {
      const client = await this.initClient();

      const res = await client.search({
        index: indexName,
        body: {
          query: {
            bool: {
              must: [
                { match_phrase_prefix: { name: searchTerm } },
                { match: { tenant: tenantId } },
              ],
            },
          },
        },
      });

      const result = res.body.hits.hits.map((hit) => ({
        id: hit._id,
        data: hit._source,
      }));

      return {
        httpCode: 200,
        data: result,
        message: `Data fetched successfully based on search term "${searchTerm}"`,
      };
    } catch (error) {
      console.log(
        `Exception occurred while searching by name in index ${indexName}: ${error}`,
      );
      return {
        httpCode: 500,
        error: error,
      };
    }
  }

  async getByName(indexName: string, input: string): Promise<any> {
    const body = {
      query: {
        multi_match: {
          query: input,
        },
      },
    };
    try {
      const res = await (
        await this.initClient()
      ).search({
        index: indexName,
        body,
      });
      if (res.body.hits.total.value == 0) {
        return {
          httpCode: 200,
          data: [],
          message: `No Data found based based on Keyword`,
        };
      }
      const result = res.body.hits.hits.map((item) => {
        return {
          _id: item._id,
          data: item._source,
        };
      });

      return {
        httpCode: 200,
        data: result,
        message: `Data fetched successfully based on Keyword`,
      };
    } catch (error) {
      console.log(`Exception occurred while doing : ${error})`);
      return {
        httpCode: 500,
        data: [],
        error: error,
      };
    }
  }

  async getByIndex(indexName: string, tenantId: string): Promise<any> {
    try {
      const res = await (
        await this.initClient()
      ).search({
        index: indexName,
        body: {
          query: {
            bool: {
              must: [{ match: { tenant: tenantId } }],
            },
          },
        },
      });
      if (res.body.hits.total.value == 0) {
        return {
          httpCode: 200,
          data: [],
          message: `No Data found based on Index ${indexName}`,
        };
      }
      const result = res.body.hits.hits.map((item) => {
        return {
          id: item._id,
          data: item._source,
        };
      });

      return {
        httpCode: 200,
        data: result,
        message: `Data fetched successfully based on Index ${indexName}`,
      };
    } catch (error) {
      console.log(
        `Exception occurred while searching index ${indexName}: ${error})`,
      );
      return {
        httpCode: 500,
        data: [],
        error: error,
      };
    }
  }

  async deleteByIndexIdAndTenant(
    indexName: string,
    id: string,
    tenantId: string,
  ): Promise<any> {
    try {
      await (
        await this.initClient()
      ).delete({
        index: indexName,
        id: id,
        refresh: true, // Opcional: especifica si se debe refrescar el índice después de eliminar el documento
        routing: tenantId,
      });

      return {
        httpCode: 200,
        message: `Data with id ${id} and tenant ${tenantId} deleted successfully from index ${indexName}`,
      };
    } catch (error) {
      console.log(
        `Exception occurred while deleting document from index ${indexName}: ${error}`,
      );
      return {
        httpCode: 500,
        error: error,
      };
    }
  }
}
