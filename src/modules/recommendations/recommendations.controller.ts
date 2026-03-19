import { Controller, Get, Param } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';

@Controller('events')
export class RecommendationsController {
  constructor(private readonly recommendationsService: RecommendationsService) {}

  @Get(':id/recommendations')
  getRecommendations(@Param('id') id: string) {
    return this.recommendationsService.getRecommendations(id);
  }
}
