import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { RecommendationsService } from './recommendations.service';

@ApiTags('recommendations')
@Controller('events')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @ApiOperation({ summary: 'Get recommendations for a specific event' })
  @ApiResponse({ status: 200, description: 'Recommended events' })
  @Get(':id/recommendations')
  getRecommendations(@Param('id') id: string) {
    return this.recommendationsService.getRecommendations(id);
  }
}
