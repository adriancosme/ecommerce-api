import { ApiResponseProperty } from '@nestjs/swagger';
import { FileType } from '../../../../../files/domain/file';

export class FileResponseDto {
  @ApiResponseProperty({
    type: () => FileType,
  })
  file: FileType;
}
