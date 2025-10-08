import { Injectable } from '@nestjs/common';
import { emotionKeywords } from '../data/emotion-keywords';

export interface EmotionResult {
  key: string;
  confidence: number;
  matchedWords: string[];
  colors: string[];
  icon: string;
}

interface EmotionData {
  name?: string;
  description?: string;
  icon?: string;
  colors?: string[];
  words: string[];
}

@Injectable()
export class EmotionAnalysisService {
  detectEmotion(text: string, language: string): EmotionResult {
    const keywords: Record<string, EmotionData> = emotionKeywords[language] || emotionKeywords['en'];
    let bestMatch: EmotionResult = {
      key: 'joy',
      confidence: 0,
      matchedWords: [],
      colors: this.getEmotionMetadata('joy', language)?.colors || [],
      icon: this.getEmotionMetadata('joy', language)?.icon || '',
    };

    let maxScore = 0;

    // Analyze each emotion category
    Object.entries(keywords).forEach(([emotionKey, emotionData]) => {
      const matchedWords: string[] = [];
      let score = 0;

      if (emotionData && Array.isArray(emotionData.words)) {
        emotionData.words.forEach((word) => {
          const regex = new RegExp(`(^|\\s|\\p{P})${word}($|\\s|\\p{P})`, 'giu');

          const matches = text.match(regex);
          if (matches) {
            score += matches.length;
            matchedWords.push(word);
          }
        });
      }

      if (score > maxScore) {
        maxScore = score;
        bestMatch = {
          key: emotionKey,
          confidence: this.calculateConfidence(score, text),
          matchedWords,
          colors: emotionData.colors || [],
          icon: emotionData.icon || '',
        };
      }
    });

    // If no emotion detected, return random one with low confidence
    console.log('maxScore: ', maxScore);
    if (maxScore === 0) {
      const emotions = Object.keys(keywords);
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      return {
        key: randomEmotion,
        confidence: 0.1,
        matchedWords: [],
        colors: keywords[randomEmotion]?.colors || [],
        icon: keywords[randomEmotion]?.icon || '',
      };
    }

    return bestMatch;
  }

  private calculateConfidence(score: number, text: string): number {
    const wordCount = text.split(/\s+/).length;
    const confidence = Math.min((score / wordCount) * 10, 1);
    return Math.round(confidence * 100) / 100;
  }

  getEmotionMetadata(emotionKey: string, language: string) {
    const keywords = emotionKeywords[language] || emotionKeywords['en'];
    const emotion = keywords[emotionKey];

    if (!emotion) {
      return null;
    }

    return {
      key: emotionKey,
      name: emotion.name,
      description: emotion.description,
      icon: emotion.icon,
      colors: emotion.colors,
    };
  }

  getAllEmotions(language: string) {
    const keywords = emotionKeywords[language] || emotionKeywords['en'];
    
    return Object.entries(keywords).map(([key, data]) => {
      if (typeof data !== 'object' || data === null) {
      return {
        key,
        name: '',
        description: '',
        icon: '',
        sampleWords: [],
      };
      }
      return {
      key,
      name: (data as any).name ?? '',
      description: (data as any).description ?? '',
      icon: (data as any).icon ?? '',
      sampleWords: Array.isArray((data as any).words) ? (data as any).words.slice(0, 5) : [],
      };
    });
  }
}