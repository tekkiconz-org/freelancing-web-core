import { ExtraTypeService } from './extra-type.service';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { ExtraTypeRepository } from './repository/extra-type.repository';
import { ExtraType } from './entity/extraType.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [TypeOrmModule.forFeature([ExtraType])],
    controllers: [],
    providers: [ExtraTypeService, ExtraTypeRepository],
    exports: [ExtraTypeService],
})
export class ExtraTypeModule {}
