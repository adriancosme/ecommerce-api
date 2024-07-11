import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FileEntity } from './typeorm/file.entity';
import { FileRepository } from '../../../files/domain/file.repository';
import { TypeOrmFileRepository } from './typeorm/typeorm-file.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FileEntity])],
  providers: [
    {
      provide: FileRepository,
      useClass: TypeOrmFileRepository,
    },
  ],
  exports: [FileRepository],
})
export class FilesTypeOrmModule {}
