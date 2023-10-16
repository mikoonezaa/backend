/* eslint-disable @typescript-eslint/no-unused-vars */
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
  IsIn,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { PageRequestDto } from 'src/utils/dto/page.dto';
export class UtsDto {
  @IsNumber()
  id: number;
  @IsNotEmpty()
  @Length(1, 100)
  nama: string;

  @IsNotEmpty()
  @Length(1, 100)
  @IsIn(['honda', 'suzuki', 'toyota'], {
    message: 'Merek harus salah satu dari: honda suzuki toyota',
  })
  merekMobil: string;

  @IsNotEmpty()
  @IsIn(
    [
      'CRV',
      'BRV',
      'HRV',
      'Avanza',
      'Innova',
      'Raize',
      'Ertiga',
      'XL7',
      'Baleno',
    ],
    {
      message: 'Tipe mobil tidak valid',
    },
  )
  tipeMobil: string;

  @IsInt()
  @Min(150000000)
  @Max(400000000)
  harga: number;

  @IsInt()
  @Min(2017)
  @Max(2023)
  tahun: number;
}

export class CreateUtsDto extends OmitType(UtsDto, ['id']) {}
export class UpdateUtsDto extends PickType(UtsDto, [
  'nama',
  'merekMobil',
  'tipeMobil',
  'harga',
  'tahun',
]) {}

export class createUtsArrayDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateUtsDto)
  data: CreateUtsDto[];
}

export class deleteUtsArrayDto {
  @IsArray()
  delete: CreateUtsDto[];
}
export class findUtsDto extends PageRequestDto {
  @IsOptional()
  nama: string;

  @IsOptional()
  merekMobil: string;

  @IsOptional()
  tipeMobil: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  harga: number;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  tahun: number;
}

@ValidatorConstraint({ name: 'mobile', async: false })
export class IsTipeMobilValid implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { object } = args;
    if (!object) {
      return false;
    }
    const allowedTypes: { [merek: string]: string[] } = {
      honda: ['CRV', 'BRV', 'HRV'],
      suzuki: ['Ertiga', 'XL7', 'Baleno'],
      toyota: ['Avanza', 'Innova', 'Raize'],
    };

    const merekMobil = object['merekMobil'];
    if (merekMobil in allowedTypes) {
      return allowedTypes[merekMobil].includes(value);
    }
    return false;
  }

  defaultMessage(args: ValidationArguments) {
    return `Tipe mobil tidak valid untuk merek mobil '${args.object['merekMobil']}'`;
  }
}
