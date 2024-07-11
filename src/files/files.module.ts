import { Module } from '@nestjs/common';
import { FileConfig, FileDriver } from './config/file-config.type';
import fileConfig from './config/file.config';
import { FilesLocalModule } from './infrastructure/uploader/local/files.module';
import { FilesS3Module } from './infrastructure/uploader/s3/files.module';
import { FilesS3PresignedModule } from './infrastructure/uploader/s3-presigned/files.module';
import { FilesTypeOrmModule } from './infrastructure/persistance/files-typeorm.module';
import { FilesService } from './files.service';
const infrastructureUploaderModule =
  (fileConfig() as FileConfig).driver === FileDriver.LOCAL
    ? FilesLocalModule
    : (fileConfig() as FileConfig).driver === FileDriver.S3
      ? FilesS3Module
      : FilesS3PresignedModule;

@Module({
  imports: [FilesTypeOrmModule, infrastructureUploaderModule],
  providers: [FilesService],
  exports: [FilesService, FilesTypeOrmModule],
})
export class FilesModule {}
