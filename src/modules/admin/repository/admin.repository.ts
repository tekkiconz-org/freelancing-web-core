import { Injectable } from '@nestjs/common';
import { Admin } from '../entity/admin.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class AdminRepository extends Repository<Admin> {
    constructor(private dataSource: DataSource) {
        super(Admin, dataSource.createEntityManager());
    }
}
