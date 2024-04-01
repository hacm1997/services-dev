import { Injectable } from '@nestjs/common';
import { OpenSearch } from 'src/infrastructure/opensearch/client/openSearch';
import { PersonModel } from './person.model';

@Injectable()
export class PersonOpenSearchRespository {
  public static INDEX = 'person';
  constructor(private clientOpenSearch: OpenSearch) {}

  public async updatePerson(id: string, person: PersonModel) {
    try {
      const client = await this.clientOpenSearch.initClient();
      console.log(person, id);
      await client.update({
        index: PersonOpenSearchRespository.INDEX,
        id: id,
        body: {
          doc: {
            name: person.name,
            personInfo: JSON.stringify(person.personInfo),
          },
        },
      });
      return {
        httpCode: 200,
        message: `Person with ID ${id} updated successfully in index ${PersonOpenSearchRespository.INDEX}`,
      };
    } catch (error) {
      console.log(
        `Exception occurred while updating document in index ${PersonOpenSearchRespository.INDEX}: ${error}`,
      );
      return {
        httpCode: 500,
        error: error,
      };
    }
  }
}
