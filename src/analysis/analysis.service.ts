import { Injectable } from '@nestjs/common';
import { EmotionAnalysisService } from '../poetry/services/emotion-analysis.service';
import { BatchAnalysisDto } from './dto/batch-analysis.dto';

@Injectable()
export class AnalysisService {
  constructor(
    private readonly emotionAnalysisService: EmotionAnalysisService,
  ) {}

  async analyzeBatch(dto: BatchAnalysisDto) {
    const results = dto.poems.map((poem) => {
      const emotion = this.emotionAnalysisService.detectEmotion(
        poem.text,
        dto.language,
      );
      return {
        poem: poem.text.substring(0, 50) + '...',
        poet: poem.poet,
        emotion: emotion.key,
        confidence: emotion.confidence,
      };
    });

    return {
      total: results.length,
      language: dto.language,
      results,
      summary: this.generateSummary(results),
    };
  }

  async comparePoems(poem1: string, poem2: string, language: string) {
    const emotion1 = this.emotionAnalysisService.detectEmotion(poem1, language);
    const emotion2 = this.emotionAnalysisService.detectEmotion(poem2, language);

    return {
      poem1: {
        emotion: emotion1.key,
        confidence: emotion1.confidence,
        preview: poem1.substring(0, 50) + '...',
      },
      poem2: {
        emotion: emotion2.key,
        confidence: emotion2.confidence,
        preview: poem2.substring(0, 50) + '...',
      },
      comparison: {
        sameEmotion: emotion1.key === emotion2.key,
        confidenceDiff: Math.abs(emotion1.confidence - emotion2.confidence),
        similarity: this.calculateSimilarity(emotion1, emotion2),
      },
    };
  }

  private generateSummary(results: any[]) {
    const emotionCounts = {};
    results.forEach((r) => {
      emotionCounts[r.emotion] = (emotionCounts[r.emotion] || 0) + 1;
    });

    const mostCommon = Object.entries(emotionCounts).reduce((a, b) =>
      a[1] > b[1] ? a : b,
    );

    return {
      mostCommonEmotion: mostCommon[0],
      count: mostCommon[1],
      distribution: emotionCounts,
    };
  }

  private calculateSimilarity(emotion1: any, emotion2: any): number {
    if (emotion1.key === emotion2.key) return 1.0;
    
    const sharedWords = emotion1.matchedWords.filter(w =>
      emotion2.matchedWords.includes(w)
    ).length;
    
    const totalWords = new Set([
      ...emotion1.matchedWords,
      ...emotion2.matchedWords
    ]).size;
    
    return totalWords > 0 ? sharedWords / totalWords : 0;
  }
}