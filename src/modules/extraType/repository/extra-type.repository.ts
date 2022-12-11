import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ExtraType } from '../entity/extraType.entity';

@Injectable()
export class ExtraTypeRepository extends Repository<ExtraType> {
    constructor(private dataSource: DataSource) {
        super(ExtraType, dataSource.createEntityManager());
    }
}
