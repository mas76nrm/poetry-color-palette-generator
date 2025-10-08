import { IsString, IsNotEmpty, IsOptional, IsIn } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AnalyzePoetryDto {
  @ApiProperty({
    description: 'The poetry text to analyze',
    example: 'Shall I compare thee to a summer\'s day?\nThou art more lovely and more temperate',
  })
  @IsString()
  @IsNotEmpty()
  text: string;

  @ApiProperty({
    description: 'Language of the poetry',
    example: 'en',
    enum: ['fa', 'en'],
    default: 'en',
  })
  @IsOptional()
  @IsIn(['fa', 'en'])
  language?: string = 'en';

  @ApiProperty({
    description: 'Optional poet name',
    example: 'William Shakespeare',
    required: false,
  })
  @IsOptional()
  @IsString()
  poet?: string;
}