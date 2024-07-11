import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { AppConfig } from '../../../../config/app-config.type';
import appConfig from '../../../../config/app.config';
import {
  FileConfig,
  FileDriver,
} from '../../../../files/config/file-config.type';
import fileConfig from '../../../../files/config/file.config';
import { EntityHelper } from '../../../../utils/entity-helper';

@Entity({
  name: 'file',
})
export class FileEntity extends EntityHelper {
  @ApiResponseProperty({
    type: String,
    example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiResponseProperty({
    type: String,
    example: 'https://example.com/path/to/file.jpg',
  })
  @Column()
  @Transform(
    ({ value }) => {
      if ((fileConfig() as FileConfig).driver === FileDriver.LOCAL) {
        return (appConfig() as AppConfig).backendDomain + value;
      } else if (
        [FileDriver.S3_PRESIGNED, FileDriver.S3].includes(
          (fileConfig() as FileConfig).driver,
        )
      ) {
        const s3 = new S3Client({
          region: (fileConfig() as FileConfig).awsS3Region ?? '',
          credentials: {
            accessKeyId: (fileConfig() as FileConfig).accessKeyId ?? '',
            secretAccessKey: (fileConfig() as FileConfig).secretAccessKey ?? '',
          },
        });

        const command = new GetObjectCommand({
          Bucket: (fileConfig() as FileConfig).awsDefaultS3Bucket ?? '',
          Key: value,
        });

        return getSignedUrl(s3, command, { expiresIn: 3600 });
      }

      return value;
    },
    {
      toPlainOnly: true,
    },
  )
  path: string;
}
