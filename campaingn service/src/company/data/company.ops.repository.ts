import { Injectable } from '@nestjs/common';
import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { CompanyModel } from './company.model';

@Injectable()
export class CompanyOpenSearchRespository {
  public static INDEX = 'company';
  constructor(private clientOpenSearch: OpenSearch) {}

  public async updateCompany(id: string, company: CompanyModel) {
    try {
      const client = await this.clientOpenSearch.initClient();
      await client.update({
        index: CompanyOpenSearchRespository.INDEX,
        id: id,
        body: {
          doc: {
            name: company.name,
            companyInfo: JSON.stringify(company.companyInfo),
          },
        },
      });
      return {
        httpCode: 200,
        message: `Company with ID ${id} updated successfully in index ${CompanyOpenSearchRespository.INDEX}`,
      };
    } catch (error) {
      console.log(
        `Exception occurred while updating document in index ${CompanyOpenSearchRespository.INDEX}: ${error}`,
      );
      return {
        httpCode: 500,
        error: error,
      };
    }
  }
}
