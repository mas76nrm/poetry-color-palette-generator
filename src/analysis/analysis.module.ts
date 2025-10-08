import { Module } from '@nestjs/common';
import { AnalysisController } from './analysis.controller';
import { AnalysisService } from './analysis.service';
import { PoetryModule } from '../poetry/poetry.module';

@Module({
  imports: [PoetryModule],
  controllers: [AnalysisController],
  providers: [AnalysisService],
})
export class AnalysisModule {}