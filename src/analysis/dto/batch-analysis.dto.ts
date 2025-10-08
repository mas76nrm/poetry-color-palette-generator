import { IsString, IsArray, IsOptional, ValidateNested, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class PoemDto {
  @ApiProperty()
  @IsString()
  text: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  poet?: string;
}

export class BatchAnalysisDto {
  @ApiProperty({ type: [PoemDto] })
  @IsArray()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => PoemDto)
  poems: PoemDto[];

  @ApiProperty({ default: 'en' })
  @IsString()
  language: string;
}