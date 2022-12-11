import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { CloudinaryModule } from './modules/cloudinary/cloudinary.module';
import { ExtraTypeModule } from './modules/extraType/extra-type.module';
import { GigModule } from './modules/gig/gig.module';
import { GigExtraModule } from './modules/gigExtras/gigextra.module';
import { GigPlanModule } from './modules/gigPlan/gigplan.module';
import { UsersModule } from './modules/user/users.module';
import ormConfig from './ormconfig';

const Modules = [
    AuthModule,
    UsersModule,
    CloudinaryModule,
    GigModule,
    GigPlanModule,
    GigExtraModule,
    ExtraTypeModule,
    TypeOrmModule.forRootAsync({ useFactory: ormConfig }),
];
export default Modules;
