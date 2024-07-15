import { ApiResponseProperty } from '@nestjs/swagger';
import { EntityHelper } from '../../../../utils/entity-helper';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({
  name: 'status',
})
export class StatusEntity extends EntityHelper {
  @ApiResponseProperty({
    type: Number,
  })
  @PrimaryColumn()
  id: number;

  @ApiResponseProperty({
    type: String,
    example: 'active',
  })
  @Column()
  name?: string;
}
