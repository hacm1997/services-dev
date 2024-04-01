import { Controller, Param, Post } from '@nestjs/common';
import { OpenSearch } from './openSearch';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('opensearch')
@Controller('opensearch')
export class OpenSearchController {
  constructor(private readonly openSearchService: OpenSearch) {}

  @Post('reindex/:sourceIndex/:destinationIndex')
  async reindex(
    @Param('sourceIndex') sourceIndex: string,
    @Param('destinationIndex') destinationIndex: string,
  ): Promise<any> {
    try {
      await this.openSearchService.reindex(sourceIndex, destinationIndex);
      return {
        message: `Re-indexación de ${sourceIndex} a ${destinationIndex} completada.`,
      };
    } catch (error) {
      return { error: 'Error durante la re-indexación.' };
    }
  }
}
