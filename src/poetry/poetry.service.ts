import { Injectable, Logger } from '@nestjs/common';
import { EmotionAnalysisService } from './services/emotion-analysis.service';
import { ColorService } from '../color/color.service';
import { AnalyzePoetryDto } from './dto/analyze-poetry.dto';
import { PoetryAnalysisResponseDto } from './dto/poetry-analysis-response.dto';

@Injectable()
export class PoetryService {
  private readonly logger = new Logger(PoetryService.name);

  constructor(
    private readonly emotionAnalysisService: EmotionAnalysisService,
    private readonly colorService: ColorService,
  ) {}

  async analyzePoetry(
    dto: AnalyzePoetryDto,
  ): Promise<PoetryAnalysisResponseDto> {
    this.logger.log(`Analyzing poetry in ${dto.language} language`);

    // Detect emotion from poetry text
    const emotion = this.emotionAnalysisService.detectEmotion(
      dto.text,
      dto.language,
    );

    this.logger.debug(`Detected emotion: ${emotion.key}`);

    // Generate color palette based on emotion
    const colors = this.colorService.generateColorsFromEmotion(emotion);

    // Generate gradient
    const gradient = this.colorService.generateGradient(colors);

    // Generate CSS code
    const cssCode = this.colorService.generateCSSCode(colors, gradient);

    // Get emotion metadata in requested language
    const emotionMetadata = this.emotionAnalysisService.getEmotionMetadata(
      emotion.key,
      dto.language,
    );

    return {
      emotion: emotionMetadata,
      colors,
      gradient,
      cssCode,
      analysis: {
        textLength: dto.text.length,
        wordCount: dto.text.split(/\s+/).length,
        language: dto.language,
        confidence: emotion.confidence,
      },
      timestamp: new Date().toISOString(),
    };
  }
}