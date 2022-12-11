import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GigExtra } from '../entity/gigExtra.entity';

@Injectable()
export class GigExtraRepository extends Repository<GigExtra> {
    constructor(private dataSource: DataSource) {
        super(GigExtra, dataSource.createEntityManager());
    }
}
