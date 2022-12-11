/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ExtraType } from './entity/extraType.entity';
import { ExtraTypeRepository } from './repository/extra-type.repository';

@Injectable()
export class ExtraTypeService {
    constructor(private extraTypeRepository: ExtraTypeRepository) {}

    async getExtraTypeById(id: number): Promise<ExtraType> {
        return this.extraTypeRepository.findOneBy({ id });
    }
}
