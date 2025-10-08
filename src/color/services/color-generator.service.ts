import { Injectable } from '@nestjs/common';
import { ColorConverterService } from './color-converter.service';

@Injectable()
export class ColorGeneratorService {
  constructor(private readonly colorConverter: ColorConverterService) {}

  generateVariations(baseColors: string[], count: number): string[] {
    if (baseColors.length === 0) return [];
    const result: string[] = [];
    const colorsNeeded = count;

    // Add base colors first
    baseColors.forEach(color => result.push(color));

    // Generate lighter variations
    while (result.length < colorsNeeded && result.length < baseColors.length * 3) {
      for (const color of baseColors) {
        if (result.length >= colorsNeeded) break;
        
        const hsl = this.colorConverter.hexToHsl(color);
        hsl.l = Math.min(95, hsl.l + 15);
        result.push(this.colorConverter.hslToHex(hsl.h, hsl.s, hsl.l));
      }
    }

    // Generate darker variations if needed
    while (result.length < colorsNeeded) {
      for (const color of baseColors) {
        if (result.length >= colorsNeeded) break;
        
        const hsl = this.colorConverter.hexToHsl(color);
        hsl.l = Math.max(20, hsl.l - 15);
        result.push(this.colorConverter.hslToHex(hsl.h, hsl.s, hsl.l));
      }
    }

    return result.slice(0, count);
  }

  getComplementary(hex: string): string {
    const hsl = this.colorConverter.hexToHsl(hex);
    hsl.h = (hsl.h + 180) % 360;
    return this.colorConverter.hslToHex(hsl.h, hsl.s, hsl.l);
  }

  getAnalogous(hex: string): string[] {
    const hsl = this.colorConverter.hexToHsl(hex);
    return [
      this.colorConverter.hslToHex((hsl.h - 30 + 360) % 360, hsl.s, hsl.l),
      hex,
      this.colorConverter.hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
    ];
  }

  getTriadic(hex: string): string[] {
    const hsl = this.colorConverter.hexToHsl(hex);
    return [
      hex,
      this.colorConverter.hslToHex((hsl.h + 120) % 360, hsl.s, hsl.l),
      this.colorConverter.hslToHex((hsl.h + 240) % 360, hsl.s, hsl.l),
    ];
  }

  generateMonochromatic(hex: string, count: number = 5): string[] {
    const hsl = this.colorConverter.hexToHsl(hex);
    const result: string[] = [];
    const step = 80 / count;

    for (let i = 0; i < count; i++) {
      const lightness = 20 + (i * step);
      result.push(this.colorConverter.hslToHex(hsl.h, hsl.s, lightness));
    }

    return result;
  }
}