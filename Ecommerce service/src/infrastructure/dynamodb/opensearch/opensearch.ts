import client from '../../opensearch';
import { ApiResponse, Client } from '@opensearch-project/opensearch/.';
import { OPENSEARCH_INDEX } from '../intializer/Constants';

export class OpenSearch {
  private readonly client: Client;
  private readonly index: string = OPENSEARCH_INDEX ?? 'eccommerce-failed';
  private readonly settings: any = {
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
        pid: { type: 'text' },
        sid: { type: 'text' },
        name: { type: 'text' },
        price: { type: 'long' },
        createAt: { type: 'text' },
        status: { type: 'text' },
        description: { type: 'text' },
        extraInfo: { type: 'text' },
      },
    },
  };

  constructor() {
    this.client = client;
  }

  async createIndex(): Promise<void> {
    await this.client.indices
      .create({
        index: this.index,
        body: this.settings,
      })
      .then((response: ApiResponse) => {
        console.log('Index created', response.body);
      })
      .catch((error: any) => {
        console.log('Error creating index', error);
      });
  }

  async deleteIndex(): Promise<void> {
    await this.client.indices.delete({
      index: this.index,
    });
  }

  async getIndex(): Promise<any> {
    return await this.client.indices.get({
      index: this.index,
    });
  }

  async indexExists(): Promise<boolean | unknown> {
    const response = await this.client.indices.exists({
      index: this.index,
    });
    if (response.body) {
      const index = await this.getIndex();
      console.log('Index exists', index.body[this.index].mappings);
      const settings = this.settings.settings;
      const mappings = this.settings.mappings;
      console.log('Settings', mappings);
      const keysOfSettings = Object.keys(settings);
      const keysOfMappings = Object.keys(mappings);
      const settigsEquals = keysOfSettings.every((key) => {
        return settings[key] === index.body[this.index].settings.index[key];
      });
      const mappingsEquals = keysOfMappings.every((key) => {
        return (
          mappings[key] === index.body[this.index].mappings.properties[key]
        );
      });
      if (!settigsEquals || !mappingsEquals) {
        console.log('Index settings are not equals');
      }
    }
    return response.body;
  }

  async indexResource(product: any): Promise<unknown> {
    return await this.client.index({
      index: this.index,
      body: product,
      id: product.sid,
      refresh: true,
    });
  }

  async search(query: string): Promise<any> {
    // search for documents with sql like query language in opensearch
    const response: ApiResponse<
      Record<string, any>,
      unknown
    > = (await this.client.transport
      .request({
        method: 'POST',
        path: '_plugins/_sql',
        body: {
          query,
        },
      })
      .catch((error: any) => {
        console.log('Error searching', error);
        console.log('Error searching', error.meta.body.error);
        return null;
      })) as ApiResponse<Record<string, any>, unknown>;
    console.log('Response', response);
    if (response == null) {
      return [];
    }
    const schema = response.body.schema;
    const datarows = response.body.datarows;
    const results = datarows.map((row: any) => {
      const result: any = {};
      schema.forEach((column: any, index: number) => {
        result[column.name] = row[index];
      });
      return result;
    });
    return results;
  }

  // return _id of the document
  async searchProduct(id: string): Promise<any> {
    console.log('Searching product', id);
    const response = await this.client.search({
      index: this.index,
      body: {
        query: {
          match: {
            sid: id,
          },
        },
      },
    });
    console.log('Response', response.body.hits.hits);
    return response.body.hits.hits[0];
  }

  async deleteProduct(id: string): Promise<void> {
    const resource = await this.getProduct(id);
    await this.client.update({
      index: this.index,
      id: resource._id,
      body: {
        doc: {
          status: 'deleted',
        },
      },
    });
  }

  async updateProduct(id: string, product: any): Promise<void> {
    const productToUpdate = await this.getProduct(id);
    // await this.deleteresource(id);
    console.log('resource to update', productToUpdate);
    const produtToUpdateId = productToUpdate._id;
    console.log('resource to update id', produtToUpdateId);
    await this.client.update({
      index: this.index,
      id: produtToUpdateId,
      body: {
        doc: {
          ...product,
        },
      },
    });
  }

  async getProduct(id: string): Promise<any> {
    return await this.client
      .search({
        index: this.index,
        body: {
          query: {
            match: {
              sid: id,
            },
          },
        },
      })
      .then((response: ApiResponse) => {
        return response.body.hits.hits[0];
      })
      .catch((error: any) => {
        console.log('Error getting booking', error);
        return null;
      });
  }
}
