import { Controller, Get, Query, UseInterceptors } from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { ColorService } from './color.service';

@ApiTags('colors')
@Controller('api/colors')
@UseInterceptors(CacheInterceptor)
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @Get('convert')
  @ApiOperation({ summary: 'Convert color between formats' })
  @ApiQuery({ name: 'color', example: '#FF6B9D' })
  @ApiQuery({ name: 'format', enum: ['hex', 'rgb', 'hsl'] })
  @ApiResponse({ status: 200, description: 'Converted color' })
  convertColor(
    @Query('color') color: string,
    @Query('format') format: 'hex' | 'rgb' | 'hsl',
  ) {
    return {
      input: color,
      format,
      result: this.colorService.convertColor(color, format),
    };
  }

  @Get('complementary')
  @ApiOperation({ summary: 'Get complementary color' })
  @ApiQuery({ name: 'color', example: '#FF6B9D' })
  @ApiResponse({ status: 200, description: 'Complementary color' })
  getComplementary(@Query('color') color: string) {
    return {
      original: color,
      complementary: this.colorService.generateComplementary(color),
    };
  }

  @Get('analogous')
  @ApiOperation({ summary: 'Get analogous colors' })
  @ApiQuery({ name: 'color', example: '#FF6B9D' })
  @ApiResponse({ status: 200, description: 'Analogous color scheme' })
  getAnalogous(@Query('color') color: string) {
    return {
      original: color,
      analogous: this.colorService.generateAnalogous(color),
    };
  }

  @Get('triadic')
  @ApiOperation({ summary: 'Get triadic colors' })
  @ApiQuery({ name: 'color', example: '#FF6B9D' })
  @ApiResponse({ status: 200, description: 'Triadic color scheme' })
  getTriadic(@Query('color') color: string) {
    return {
      original: color,
      triadic: this.colorService.generateTriadic(color),
    };
  }
}