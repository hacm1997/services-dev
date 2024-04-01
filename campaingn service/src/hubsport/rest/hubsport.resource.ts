import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import {
  Controller,
  Post,
  Body,
  Get,
  NotFoundException,
  Query,
  Delete,
} from '@nestjs/common';
import { CredentialsHubsportDTO, ClientHubsportDTO } from './clientHubsportDTO';
import { HubsportService } from '../service/hubsport.service';

@ApiTags('hubsport')
@Controller('hubsport')
export class HubsportResource {
  constructor(private hubsportService: HubsportService) {}
  @Post('/credentials')
  @ApiBody({ type: 'CredentialsHubsportDTO', required: true })
  @ApiResponse({
    status: 200,
    type: 'CredentialsHubsportDTO',
  })
  @ApiResponse({ status: 404, description: 'Cannot save credentials.' })
  @ApiOperation({})
  public async saveCredentialsHubsport(
    @Body() credentialsDTO: CredentialsHubsportDTO,
  ): Promise<CredentialsHubsportDTO> {
    const credentias: CredentialsHubsportDTO =
      await this.hubsportService.saveCredentialsHubsport(credentialsDTO);
    if (!credentias) {
      throw new NotFoundException('Campaign not found');
    }

    return credentias;
  }

  @Post('')
  @ApiBody({ type: 'ClientHubsportDTO', required: true })
  @ApiResponse({
    status: 200,
    type: 'ClientHubsportDTO',
  })
  @ApiResponse({ status: 404, description: 'Cannot save client.' })
  @ApiOperation({})
  public async saveClientHubsport(
    @Body() clientHubsportDTO: ClientHubsportDTO,
  ): Promise<boolean> {
    const res =
      await this.hubsportService.saveClientHubsport(clientHubsportDTO);
    if (!res) {
      throw new NotFoundException('Campaign not found');
    }

    return res;
  }
  @Get('')
  @ApiResponse({ status: 200, type: 'ClientHubsportDTO' })
  @ApiResponse({ status: 404, description: 'Clients not found' })
  @ApiOperation({ summary: 'Get all clients by tenant' })
  public async getAllClentsHubsportByTenant(
    @Query('tenant') tenant: string,
  ): Promise<any[]> {
    const clients: CredentialsHubsportDTO[] =
      await this.hubsportService.getAllClentsHubsportByTenant(tenant);

    if (!clients) {
      throw new NotFoundException('Campaign not found');
    }
    return clients;
  }
  @Get('/configCredencials')
  @ApiResponse({ status: 200, type: 'CredentialsHubsportDTO' })
  @ApiResponse({ status: 404, description: 'credentials not found' })
  @ApiOperation({ summary: 'Get confirmations credentials by tenant' })
  public async getCredentialsConfimations(
    @Query('tenant') tenant: string,
  ): Promise<any> {
    const res: boolean =
      await this.hubsportService.getCredentialsConfimations(tenant);
    return res;
  }
  @Delete('')
  @ApiResponse({ status: 200, type: 'ClientHubsportDTO' })
  @ApiResponse({ status: 404, description: 'Clients not found' })
  @ApiOperation({ summary: 'Delete clients by id and tenant' })
  public async DeleteClientsHubsportById(
    @Query('id') id: string,
    @Query('tenant') tenant: string,
  ): Promise<boolean> {
    const res: boolean = await this.hubsportService.DeleteClientsHubsportById(
      id,
      tenant,
    );
    return res;
  }
}
