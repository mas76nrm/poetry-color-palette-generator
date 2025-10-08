import { Module } from '@nestjs/common';
import { PoetryController } from './poetry.controller';
import { PoetryService } from './poetry.service';
import { EmotionAnalysisService } from './services/emotion-analysis.service';
import { PoetDataService } from './services/poet-data.service';
import { ColorModule } from '../color/color.module';

@Module({
  imports: [ColorModule],
  controllers: [PoetryController],
  providers: [PoetryService, EmotionAnalysisService, PoetDataService],
  exports: [PoetryService, EmotionAnalysisService],
})
export class PoetryModule {}