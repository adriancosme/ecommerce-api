import { ApiResponseProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { EntityHelper } from '../../../../utils/entity-helper';

@Entity({
  name: 'role',
})
export class RoleEntity extends EntityHelper {
  @ApiResponseProperty({
    type: Number,
  })
  @PrimaryColumn()
  id: number;

  @ApiResponseProperty({
    type: String,
    example: 'admin',
  })
  @Column()
  name?: string;
}
