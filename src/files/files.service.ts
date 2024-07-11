import { Injectable } from '@nestjs/common';
import { Nullable } from '../utils/types/nullable.type';
import { FileType } from './domain/file';
import { FileRepository } from './domain/file.repository';

@Injectable()
export class FilesService {
  constructor(private readonly fileRepository: FileRepository) {}

  findById(id: FileType['id']): Promise<Nullable<FileType>> {
    return this.fileRepository.findById(id);
  }
}
