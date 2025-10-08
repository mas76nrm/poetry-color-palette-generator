import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { CacheModule } from '@nestjs/cache-manager';
import { PoetryModule } from './poetry/poetry.module';
import { ColorModule } from './color/color.module';
import { AnalysisModule } from './analysis/analysis.module';
import { I18nModule } from './i18n/i18n.module';

@Module({
  imports: [
    // Environment configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    // Rate limiting
    ThrottlerModule.forRoot([{
      ttl: 60000, // 1 minute
      limit: 20, // 20 requests per minute
    }]),

    // In-memory caching
    CacheModule.register({
      isGlobal: true,
      ttl: 300, // 5 minutes
      max: 100, // Maximum items in cache
    }),

    // Feature modules
    I18nModule,
    PoetryModule,
    ColorModule,
    AnalysisModule,
  ],
})
export class AppModule {}