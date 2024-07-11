import { Nullable } from '../../utils/types/nullable.type';
import { FileType } from './file';

export abstract class FileRepository {
  abstract create(data: Omit<FileType, 'id'>): Promise<FileType>;

  abstract findById(id: FileType['id']): Promise<Nullable<FileType>>;
}
