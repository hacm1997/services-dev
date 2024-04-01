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
import { CompanyService } from '../service/company.service';
import { CompanyModel } from '../data/company.model';
import { CompanyPaginate } from '../service/type.pagination';

@ApiTags('company')
@Controller('company')
@UseInterceptors(TransformInterceptor)
export class CompanyController {
  constructor(private companyService: CompanyService) {}
  @Post('')
  @ApiResponse({ status: 400, description: 'company not create' })
  public async createContact(
    @Body() company: CompanyModel,
  ): Promise<CompanyModel> {
    const companyD = await this.companyService.createCompany(company);
    return companyD;
  }

  @Get('')
  @ApiResponse({ status: 200, type: 'CompanyDTO' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiOperation({ summary: 'Get companies by tenant' })
  public async getAllContacts(
    @Query('page') page: number,
    @Query('limit') pageSize: number,
  ): Promise<CompanyPaginate> {
    const companies = await this.companyService.getAllCompanies(
      Number(page),
      Number(pageSize),
    );
    return companies;
  }
  @Get('/search/:index')
  @ApiResponse({ status: 200, type: 'companyDTO' })
  @ApiResponse({ status: 404, description: 'companies not found' })
  @ApiOperation({ summary: 'Get companies by tenant' })
  public async getAllCompanyOpenSearch(
    @Param('index') index: string,
    @Query('page') page: number,
    @Query('limit') pageSize: number,
  ): Promise<CompanyPaginate> {
    const persons = await this.companyService.getCompaniesOPS(
      index,
      Number(page),
      Number(pageSize),
    );
    return persons;
  }
  @Get('/search/filters/:index')
  @ApiResponse({ status: 200, type: 'companyDTO' })
  @ApiResponse({ status: 404, description: 'company not found' })
  @ApiOperation({ summary: 'Get company by tenant' })
  public async getAllNameCompanyOpenSearch(
    @Param('index') index: string,
    @Query('name') name: string,
  ): Promise<CompanyPaginate> {
    const persons = await this.companyService.getAllNameCompanyOpenSearch(
      index,
      name,
    );
    return persons;
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: 'CompanyModel' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiOperation({ summary: 'Get Company by ID' })
  public async getCompanyById(
    @Param('id') companyId: string,
  ): Promise<CompanyModel> {
    const company = await this.companyService.getCompanyById(companyId);
    return company;
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
  ): Promise<CompanyPaginate> {
    const company = await this.companyService.getCompanyByNameOPS(
      index,
      input,
      page,
      pageSize,
    );
    return company;
  }

  @Put(':id')
  @ApiResponse({ status: 200, type: 'CompanyDTO' })
  @ApiResponse({
    status: 404,
    description: 'The company cannot be update',
  })
  @ApiOperation({ summary: 'update company' })
  public async activateSubscription(
    @Param('id') companyId: string,
    @Body() company: CompanyModel,
  ): Promise<CompanyModel> {
    return await this.companyService.updateCompany(companyId, company);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: 'CompanyDTO' })
  @ApiResponse({
    status: 404,
    description: 'The company cannot be update',
  })
  @ApiOperation({ summary: 'update company' })
  public async deletePersonOPS(
    @Param('id') companyId: string,
    @Query('index') index: string,
  ): Promise<any> {
    return await this.companyService.deleteCompany(index, companyId);
  }
}
