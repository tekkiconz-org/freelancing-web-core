import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/user/users.module';
import ormConfig from './ormconfig';

const Modules = [AuthModule, UsersModule, TypeOrmModule.forRootAsync({ useFactory: ormConfig })];
export default Modules;
