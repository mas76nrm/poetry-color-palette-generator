import { Injectable } from '@nestjs/common';
import { ColorGeneratorService } from './services/color-generator.service';
import { ColorConverterService } from './services/color-converter.service';

@Injectable()
export class ColorService {
  constructor(
    private readonly colorGenerator: ColorGeneratorService,
    private readonly colorConverter: ColorConverterService,
  ) {}

  generateColorsFromEmotion(emotion: any): string[] {
    const baseColors = Array.isArray(emotion.colors) ? [...emotion.colors] : [];
    
    // Generate variations
    const variations = this.colorGenerator.generateVariations(baseColors, 6);
    
    return variations;
  }

  generateGradient(colors: string[], angle: number = 135): string {
    return `linear-gradient(${angle}deg, ${colors.join(', ')})`;
  }

  generateCSSCode(colors: string[], gradient: string): any {
    return {
      gradient,
      colors: colors.map((color, index) => ({
        variable: `--color-${index + 1}`,
        hex: color,
        rgb: this.colorConverter.hexToRgb(color),
        hsl: this.colorConverter.hexToHsl(color),
      })),
      cssVariables: colors.map((color, i) => 
        `  --color-${i + 1}: ${color};`
      ).join('\n'),
      fullCSS: this.generateFullCSS(colors, gradient),
    };
  }

  private generateFullCSS(colors: string[], gradient: string): string {
    const variables = colors.map((color, i) => 
      `  --color-${i + 1}: ${color};`
    ).join('\n');

    return `:root {\n${variables}\n  --gradient: ${gradient};\n}\n\n.gradient-bg {\n  background: var(--gradient);\n}`;
  }

  convertColor(color: string, format: 'hex' | 'rgb' | 'hsl'): string {
    switch (format) {
      case 'rgb':
        return this.colorConverter.hexToRgbString(color);
      case 'hsl':
        return this.colorConverter.hexToHslString(color);
      default:
        return color;
    }
  }

  generateComplementary(color: string): string {
    return this.colorGenerator.getComplementary(color);
  }

  generateAnalogous(color: string): string[] {
    return this.colorGenerator.getAnalogous(color);
  }

  generateTriadic(color: string): string[] {
    return this.colorGenerator.getTriadic(color);
  }
}