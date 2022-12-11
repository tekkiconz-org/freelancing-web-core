import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsString } from 'class-validator';
import { PlanType } from '../entity/gigPlan.entity';

export class GigPlanCreationDto {
    @ApiProperty()
    @IsNumber()
    gigId: number;

    @ApiProperty()
    @IsEnum(PlanType)
    planType: PlanType;

    @ApiProperty()
    @IsString()
    descriptions: string;

    @ApiProperty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @IsString()
    metadata: string;
}
