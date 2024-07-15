import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../domain/role';
import { IsNumber } from 'class-validator';

export class RoleDto implements Role {
  @ApiProperty()
  @IsNumber()
  id: number;
}
