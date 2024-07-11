import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileRepository } from '../../../../files/domain/file.repository';
import { FileEntity } from './file.entity';
import { FileType } from '../../../../files/domain/file';
import { FileMapper } from '../mapper/file.mapper';
import { Nullable } from '../../../../utils/types/nullable.type';

@Injectable()
export class TypeOrmFileRepository implements FileRepository {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async create(data: FileType): Promise<FileType> {
    const persistenceModel = FileMapper.toPersistence(data);
    return this.fileRepository.save(
      this.fileRepository.create(persistenceModel),
    );
  }

  async findById(id: FileType['id']): Promise<Nullable<FileType>> {
    const entity = await this.fileRepository.findOne({
      where: {
        id: id,
      },
    });

    return entity ? FileMapper.toDomain(entity) : null;
  }
}
