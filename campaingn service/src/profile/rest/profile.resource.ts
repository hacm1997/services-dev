import { ApiTags, ApiBody, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { Controller, Post, Body } from '@nestjs/common';
import { ProfileDTO } from './profileDTO';
import { ProfileService } from '../service/profile.service';

@ApiTags('profile')
@Controller('profile')
export class ProfileResource {
  constructor(private profileService: ProfileService) {}
  @Post('')
  @ApiBody({ type: 'ProfileDTO', required: true })
  @ApiResponse({
    status: 201,
    type: 'ProfileDTO',
  })
  @ApiOperation({})
  public async createProfile(
    @Body() profileDTO: ProfileDTO,
  ): Promise<ProfileDTO> {
    return await this.profileService.profileCreate(profileDTO);
  }
}
