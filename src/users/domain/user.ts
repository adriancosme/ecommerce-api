import { ApiResponseProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Role } from '../../roles/domain/role';
import { Status } from '../../statuses/domain/status';
import { FileType } from '../../files/domain/file';

export class User {
  @ApiResponseProperty({
    type: Number,
  })
  id: number;

  @ApiResponseProperty({
    type: String,
    example: 'john.doe@example.com',
  })
  @Expose({ groups: ['me', 'admin'] })
  email: string | null;

  @Exclude({ toPlainOnly: true })
  password?: string;

  @Exclude({ toPlainOnly: true })
  previousPassword?: string;

  @ApiResponseProperty({
    type: String,
    example: 'John',
  })
  firstName: string | null;

  @ApiResponseProperty({
    type: String,
    example: 'Doe',
  })
  lastName: string | null;

  @ApiResponseProperty({
    type: () => FileType,
  })
  photo?: FileType | null;

  @ApiResponseProperty({
    type: () => Role,
  })
  role?: Role | null;

  @ApiResponseProperty({
    type: () => Status,
  })
  status?: Status;

  @ApiResponseProperty()
  createdAt: Date;

  @ApiResponseProperty()
  updatedAt: Date;

  @ApiResponseProperty()
  deletedAt: Date;
}
