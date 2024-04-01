import { ClientDynamodb } from 'src/infrastructure/dynamodb/client.dynamodb';
import { PersonModel } from './person.model';
export declare class PersonRepository {
    private fullClientDynamodb;
    static GROUP: string;
    constructor(fullClientDynamodb: ClientDynamodb);
    createPerson(item: PersonModel): Promise<PersonModel>;
    getAllPersons(): Promise<PersonModel[]>;
    getPersonById(personId: string): Promise<PersonModel>;
    updatePerson(personId: string, person: PersonModel): Promise<PersonModel>;
    deletePerson(personId: string): Promise<any>;
    private createNewItemFromDomainModel;
    private mapToDomain;
}
