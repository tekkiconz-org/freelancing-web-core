import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class GigExtraCreationDto {
    @ApiProperty()
    @IsNumber()
    gigId: number;

    @ApiProperty()
    @IsNumber()
    extraTypeId: number;

    @ApiProperty()
    @IsNumber()
    price: number;
}
