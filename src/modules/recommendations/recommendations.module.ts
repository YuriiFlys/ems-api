import { Module } from '@nestjs/common';
import { RecommendationsService } from './recommendations.service';
import { RecommendationsController } from './recommendations.controller';
import { RecommendationsRepository } from './recommendations.repository';

@Module({
  controllers: [RecommendationsController],
  providers: [RecommendationsService, RecommendationsRepository],
})
export class RecommendationsModule {}
