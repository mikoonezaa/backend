import { OmitType, PickType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsInt,
  Min,
  Max,
  Length,
  IsNumber,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
export class BookDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @Length(4, 30)
  title: string;

  @IsNotEmpty()
  author: string;

  @IsInt()
  @Min(1990)
  @Max(2025)
  year: number;
}

export class CreateBookDto extends OmitType(BookDto, ['id']) {}
export class UpdateBookDto extends PickType(BookDto, [
  'title',
  'author',
  'year',
]) {}

export class createBookArrayDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateBookDto)
  data: CreateBookDto[];
}

export class deleteBookArrayDto {
  @IsArray()
  data: number[];
}
export class findBookDto extends PageRequestDto {
  @IsOptional()
  title: string;

  @IsOptional()
  author: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  from_year: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  to_year: number;
}
