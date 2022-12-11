import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { GigPlan } from '../entity/gigPlan.entity';

@Injectable()
export class GigPlanRepository extends Repository<GigPlan> {
    constructor(private dataSource: DataSource) {
        super(GigPlan, dataSource.createEntityManager());
    }
}
