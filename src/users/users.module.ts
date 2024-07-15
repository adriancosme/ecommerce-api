import { Module } from '@nestjs/common';
import { FilesModule } from '../files/files.module';
import { UsersTypeOrmModule } from './infrastructure/persistance/users-typeorm.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [UsersTypeOrmModule, FilesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
