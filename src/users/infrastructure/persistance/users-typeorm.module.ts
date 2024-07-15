import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/user.entity';
import { UserRepository } from '../../../users/domain/user.repository';
import { TypeOrmUserRepository } from './typeorm/typeorm-user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  providers: [
    {
      provide: UserRepository,
      useClass: TypeOrmUserRepository,
    },
  ],
  exports: [UserRepository],
})
export class UsersTypeOrmModule {}
