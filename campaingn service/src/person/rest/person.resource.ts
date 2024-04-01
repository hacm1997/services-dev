import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';
import { PersonModel } from '../data/person.model';
import { PersonService } from '../service/person.service';
import { PersonPaginate } from '../service/type.pagination';

@ApiTags('person')
@Controller('person')
@UseInterceptors(TransformInterceptor)
export class PersonController {
  constructor(private personService: PersonService) {}
  @Post('')
  @ApiResponse({ status: 404, description: 'Person not create' })
  public async createContact(
    @Body() person: PersonModel,
  ): Promise<PersonModel> {
    const personD = await this.personService.createPerson(person);
    return personD;
  }

  @Get('')
  @ApiResponse({ status: 200, type: 'PersonDTO' })
  @ApiResponse({ status: 404, description: 'persons not found' })
  @ApiOperation({ summary: 'Get persons by tenant' })
  public async getAllContacts(
    @Query('page') page: number,
    @Query('limit') pageSize: number,
  ): Promise<PersonPaginate> {
    const persons = await this.personService.getAllPersons(
      Number(page),
      Number(pageSize),
    );
    return persons;
  }

  @Get('/search/:index')
  @ApiResponse({ status: 200, type: 'PersonDTO' })
  @ApiResponse({ status: 404, description: 'persons not found' })
  @ApiOperation({ summary: 'Get persons by tenant' })
  public async getAllContactsOpenSearch(
    @Param('index') index: string,
    @Query('page') page: number,
    @Query('limit') pageSize: number,
  ): Promise<PersonPaginate> {
    const persons = await this.personService.getPersonOPS(
      index,
      page,
      pageSize,
    );
    return persons;
  }

  @Get('/search/name/:index')
  @ApiResponse({ status: 200, type: 'PersonDTO' })
  @ApiResponse({ status: 404, description: 'persons not found' })
  @ApiOperation({ summary: 'Get persons by tenant' })
  public async getContactsByName(
    @Param('index') index: string,
    @Query('input') input: string,
    @Query('page') page: number,
    @Query('limit') pageSize: number,
  ): Promise<PersonPaginate> {
    const persons = await this.personService.getPersonByNameOPS(
      index,
      input,
      page,
      pageSize,
    );
    return persons;
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: 'PersonModel' })
  @ApiResponse({ status: 404, description: 'person not found' })
  @ApiOperation({ summary: 'Get person by ID' })
  public async getPersonById(
    @Param('id') personId: string,
  ): Promise<PersonModel> {
    const person = await this.personService.getPersonById(personId);
    return person;
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: 'PersonDTO' })
  @ApiResponse({
    status: 404,
    description: 'The person cannot be update',
  })
  @ApiOperation({ summary: 'update person' })
  public async updatePerson(
    @Param('id') personId: string,
    @Body() person: PersonModel,
  ): Promise<PersonModel> {
    return await this.personService.updatePerson(personId, person);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: 'PersonDTO' })
  @ApiResponse({
    status: 404,
    description: 'The person cannot be update',
  })
  @ApiOperation({ summary: 'update person' })
  public async deletePersonOPS(
    @Param('id') personId: string,
    @Query('index') index: string,
  ): Promise<any> {
    return await this.personService.deletePerson(index, personId);
  }
}
