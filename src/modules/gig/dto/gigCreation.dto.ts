import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class GigCreationDto {
    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    title: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    description: string;

    @ApiProperty({
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    categoryId: number;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    thumbnail: Express.Multer.File;
}
