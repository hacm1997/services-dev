import { PersonModel } from '../data/person.model';
export interface PersonPaginate {
    data: PersonModel[];
    totalPages: number;
    currentPage: number;
}
