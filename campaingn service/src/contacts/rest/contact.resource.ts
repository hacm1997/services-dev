import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ContactService } from '../service/contact.service';
import { contactDTO } from './contactDTO';
import { TransformInterceptor } from 'src/common/interceptors/transform/transform.interceptor';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CompanyModel } from 'src/company/data/company.model';
import { PersonModel } from 'src/person/data/person.model';
@Controller('contact')
@UseInterceptors(TransformInterceptor)
export class ContactController {
  constructor(private contactService: ContactService) {}
  @Post('')
  @ApiResponse({ status: 404, description: 'Contact not create' })
  public async createContact(@Body() contact: contactDTO): Promise<contactDTO> {
    const contactD = await this.contactService.createContact(contact);
    return contactD;
  }
  @Get('')
  @ApiResponse({ status: 200, type: 'ContactDTO' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  @ApiOperation({ summary: 'Get contacts by tenant' })
  public async getAllContacts(
    @Query('page') page: number,
    @Query('limit') pageSize: number,
  ): Promise<contactDTO[]> {
    const campaigns: contactDTO[] = await this.contactService.getAllContacts(
      Number(page),
      Number(pageSize),
    );

    if (!campaigns) {
      throw new NotFoundException('Contact not found');
    }
    return campaigns;
  }

  @Get('/:id')
  @ApiResponse({ status: 200, type: 'ContactDTO' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  @ApiOperation({ summary: 'Get contacts by tenant' })
  public async getContactById(@Param('id') id: string): Promise<contactDTO> {
    const contactUser: contactDTO =
      await this.contactService.getContactById(id);

    if (!contactUser) {
      throw new NotFoundException('Contact not found');
    }
    return contactUser;
  }

  @Delete('/:id')
  @ApiResponse({ status: 200, type: 'string' })
  @ApiResponse({ status: 404, description: 'Contact not deleted' })
  @ApiOperation({ summary: 'Deleted Contact' })
  public async deleteContact(@Param('id') id: string): Promise<any> {
    try {
      return await this.contactService.deleteContact(id);
    } catch (error) {
      throw new NotFoundException('Contact not deleted');
    }
  }

  @Put('/:id')
  @ApiResponse({ status: 200, type: 'contactDTO' })
  @ApiResponse({ status: 404, description: 'The contact cannot be edited' })
  @ApiOperation({ summary: 'Edit contact' })
  public async putContact(
    @Param('id') id: string,
    @Body() contactDTO: contactDTO,
  ): Promise<contactDTO> {
    return await this.contactService.putContact(id, contactDTO);
  }

  @Put('/company/:id')
  @ApiResponse({ status: 200, type: 'contactDTO' })
  @ApiResponse({
    status: 404,
    description: 'The contact company cannot be edited',
  })
  @ApiOperation({ summary: 'Edit contact company' })
  public async putContactCompany(
    @Param('id') id: string,
    @Body() company: CompanyModel,
  ): Promise<contactDTO> {
    return await this.contactService.putContactCompany(id, company);
  }

  @Put('/person/:id')
  @ApiResponse({ status: 200, type: 'contactDTO' })
  @ApiResponse({
    status: 404,
    description: 'The contact person cannot be edited',
  })
  @ApiOperation({ summary: 'Edit contact person' })
  public async putContactPerson(
    @Param('id') id: string,
    @Body() person: PersonModel,
  ): Promise<contactDTO> {
    return await this.contactService.putContactPerson(id, person);
  }

  @Get('/companyinfo/:company')
  @ApiResponse({ status: 200, type: 'ContactDTO' })
  @ApiResponse({ status: 404, description: 'Contact not found' })
  @ApiOperation({ summary: 'Get contacts by tenant' })
  public async getContactByCompanyId(
    @Param('company') company: string,
  ): Promise<contactDTO[]> {
    const contactUser: contactDTO[] =
      await this.contactService.getContactByCompanyId(company);

    if (!contactUser) {
      throw new NotFoundException('Contact not found');
    }
    return contactUser;
  }
}
