import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

import { Transform, Type, plainToInstance } from 'class-transformer';
import { IsNumber, IsOptional, IsString, ValidateNested } from 'class-validator';

import { Country } from './country';

export class FilterCountryDto {}

export class SortCountryDto {
    @ApiProperty()
    @Type(() => String)
    @IsString()
    orderBy: keyof Country;

    @ApiProperty()
    @IsString()
    order: string;
}

export class QueryCountryDto {
    @ApiPropertyOptional()
    @Transform(({ value }) => (value ? Number(value) : 1))
    @IsNumber()
    @IsOptional()
    page?: number;

    @ApiPropertyOptional()
    @Transform(({ value }) => (value ? Number(value) : 10))
    @IsNumber()
    @IsOptional()
    limit?: number;

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @Transform(({ value }) =>
        value ? plainToInstance(FilterCountryDto, JSON.parse(value)) : undefined
    )
    @ValidateNested()
    @Type(() => FilterCountryDto)
    filters?: FilterCountryDto | null;

    @ApiPropertyOptional({ type: String })
    @IsOptional()
    @Transform(({ value }) => {
        return value ? plainToInstance(SortCountryDto, JSON.parse(value)) : undefined;
    })
    @ValidateNested({ each: true })
    @Type(() => SortCountryDto)
    sort?: SortCountryDto[] | null;
}
