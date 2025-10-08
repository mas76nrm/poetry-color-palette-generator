import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AnalysisService } from './analysis.service';
import { BatchAnalysisDto } from './dto/batch-analysis.dto';

@ApiTags('analysis')
@Controller('api/analysis')
export class AnalysisController {
  constructor(private readonly analysisService: AnalysisService) {}

  @Post('batch')
  @ApiOperation({ summary: 'Analyze multiple poems at once' })
  @ApiResponse({ status: 200, description: 'Batch analysis results' })
  async batchAnalysis(@Body() dto: BatchAnalysisDto) {
    return this.analysisService.analyzeBatch(dto);
  }

  @Post('compare')
  @ApiOperation({ summary: 'Compare emotions between two poems' })
  @ApiResponse({ status: 200, description: 'Comparison results' })
  async comparePoems(
    @Body() dto: { poem1: string; poem2: string; language: string },
  ) {
    return this.analysisService.comparePoems(
      dto.poem1,
      dto.poem2,
      dto.language,
    );
  }
}