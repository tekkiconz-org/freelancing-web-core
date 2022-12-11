import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Gig } from '../entity/gig.entity';

@Injectable()
export class GigRepository extends Repository<Gig> {
    constructor(private dataSource: DataSource) {
        super(Gig, dataSource.createEntityManager());
    }
}
