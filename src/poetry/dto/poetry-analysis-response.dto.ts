import { ApiProperty } from '@nestjs/swagger';

export class EmotionDto {
  @ApiProperty()
  key: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  icon: string;

  @ApiProperty()
  colors: string[];
}

export class AnalysisDto {
  @ApiProperty()
  textLength: number;

  @ApiProperty()
  wordCount: number;

  @ApiProperty()
  language: string;

  @ApiProperty()
  confidence: number;
}

export class ColorInfoDto {
  @ApiProperty()
  variable: string;

  @ApiProperty()
  hex: string;

  @ApiProperty()
  rgb: { r: number; g: number; b: number };

  @ApiProperty()
  hsl: { h: number; s: number; l: number };
}

export class CSSCodeDto {
  @ApiProperty()
  gradient: string;

  @ApiProperty({ type: [ColorInfoDto] })
  colors: ColorInfoDto[];

  @ApiProperty()
  cssVariables: string;

  @ApiProperty()
  fullCSS: string;
}

export class PoetryAnalysisResponseDto {
  @ApiProperty({ type: EmotionDto })
  emotion: EmotionDto;

  @ApiProperty({ type: [String] })
  colors: string[];

  @ApiProperty()
  gradient: string;

  @ApiProperty({ type: CSSCodeDto })
  cssCode: CSSCodeDto;

  @ApiProperty({ type: AnalysisDto })
  analysis: AnalysisDto;

  @ApiProperty()
  timestamp: string;
}