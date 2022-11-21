import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty({
        required: true,
    })
    @IsString()
    title: string;
}
