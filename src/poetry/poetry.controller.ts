import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Query, 
  UseInterceptors
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PoetryService } from './poetry.service';
import { AnalyzePoetryDto } from './dto/analyze-poetry.dto';
import { PoetryAnalysisResponseDto } from './dto/poetry-analysis-response.dto';
import { PoetDataService } from './services/poet-data.service';

@ApiTags('poetry')
@Controller('api/poetry')
@UseInterceptors(CacheInterceptor)
export class PoetryController {
  constructor(
    private readonly poetryService: PoetryService,
    private readonly poetDataService: PoetDataService,
  ) {}

  @Post('analyze')
  @ApiOperation({ summary: 'Analyze poetry and generate color palette' })
  @ApiResponse({ 
    status: 200, 
    description: 'Successfully analyzed poetry',
    type: PoetryAnalysisResponseDto 
  })
  async analyzePoetry(
    @Body() dto: AnalyzePoetryDto,
  ): Promise<PoetryAnalysisResponseDto> {
    return this.poetryService.analyzePoetry(dto);
  }

  @Get('poets')
  @ApiOperation({ summary: 'Get list of famous poets with samples' })
  @ApiResponse({ status: 200, description: 'List of poets' })
  async getPoets(@Query('lang') lang?: string) {
    return this.poetDataService.getPoets(lang || 'fa');
  }

  @Get('emotions')
  @ApiOperation({ summary: 'Get list of supported emotions' })
  @ApiResponse({ status: 200, description: 'List of emotions with metadata' })
  async getEmotions(@Query('lang') lang?: string) {
    return this.poetDataService.getEmotions(lang || 'fa');
  }

  @Get('sample')
  @ApiOperation({ summary: 'Get a random poetry sample' })
  @ApiResponse({ status: 200, description: 'Random poetry sample' })
  async getRandomSample(@Query('lang') lang?: string) {
    return this.poetDataService.getRandomSample(lang || 'fa');
  }
}