import { Module } from '@nestjs/common';
import { ColorService } from './color.service';
import { ColorController } from './color.controller';
import { ColorGeneratorService } from './services/color-generator.service';
import { ColorConverterService } from './services/color-converter.service';

@Module({
  controllers: [ColorController],
  providers: [ColorService, ColorGeneratorService, ColorConverterService],
  exports: [ColorService],
})
export class ColorModule {}