import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist/interfaces/typeorm-options.interface';
import { User } from '../user/entity/user.entity';
import { Category } from '../category/entity/category.entity';
import { ExtraType } from '../extraType/entity/extraType.entity';
import { Gig } from '../gig/entity/gig.entity';
import { GigExtra } from '../gigExtras/entity/gigExtra.entity';
import { GigOrder } from '../gigOrder/entity/gigOrder.entity';
import { GigPlan } from '../gigPlan/entity/gigPlan.entity';
import { GigRating } from '../gigRating/entity/gigRating.entity';
import { Transaction } from '../transaction/entity/transaction.entity';

export const defaultConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: process.env.MYSQL_HOST,
    port: +process.env.MYSQL_PORT,
    username: 'root',
    password: 'root',
    database: process.env.MYSQL_DATABASE,
    // autoLoadEntities: true,
    entities: [User, Category, ExtraType, Gig, GigExtra, GigOrder, GigPlan, GigRating, Transaction],
    synchronize: true,
    logging: true,
    // dropSchema: true,
};
