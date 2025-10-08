import { Injectable } from '@nestjs/common';
import { poetsData } from '../data/poets-data';
import { EmotionAnalysisService } from './emotion-analysis.service';

@Injectable()
export class PoetDataService {
  constructor(
    private readonly emotionAnalysisService: EmotionAnalysisService,
  ) {}

  getPoets(language: string) {
    return poetsData[language] || poetsData['en'];
  }

  getRandomSample(language: string) {
    const poets = this.getPoets(language);
    const randomPoet = poets[Math.floor(Math.random() * poets.length)];
    return randomPoet;
  }

  getEmotions(language: string) {
    return this.emotionAnalysisService.getAllEmotions(language);
  }

  searchPoetsByName(name: string, language: string) {
    const poets = this.getPoets(language);
    return poets.filter(poet => 
      poet.name.toLowerCase().includes(name.toLowerCase())
    );
  }

  getPoetByStyle(style: string, language: string) {
    const poets = this.getPoets(language);
    return poets.filter(poet => 
      poet.style.toLowerCase() === style.toLowerCase()
    );
  }
}