import { RoleEntity } from '../../../../roles/infrastructure/persistance/typeorm/role.entity';
import { FileMapper } from '../../../../files/infrastructure/persistance/mapper/file.mapper';
import { User } from '../../../../users/domain/user';
import { UserEntity } from '../typeorm/user.entity';
import { FileEntity } from '../../../../files/infrastructure/persistance/typeorm/file.entity';
import { StatusEntity } from '../../../../statuses/infrastructure/persistance/typeorm/status.entity';

export class UserMapper {
  static toDomain(raw: UserEntity): User {
    const user = new User();
    user.id = raw.id;
    user.email = raw.email;
    user.password = raw.password;
    user.previousPassword = raw.previousPassword;
    user.firstName = raw.firstName;
    user.lastName = raw.lastName;
    if (raw.photo) {
      user.photo = FileMapper.toDomain(raw.photo);
    }
    user.role = raw.role;
    user.status = raw.status;
    user.createdAt = raw.createdAt;
    user.updatedAt = raw.updatedAt;
    user.deletedAt = raw.deletedAt;
    return user;
  }

  static toPersistence(user: User): UserEntity {
    let role: RoleEntity | undefined = undefined;

    if (user.role) {
      role = new RoleEntity();
      role.id = Number(user.role.id);
    }

    let photo: FileEntity | undefined | null = undefined;

    if (user.photo) {
      photo = new FileEntity();
      photo.id = user.photo.id;
      photo.path = user.photo.path;
    } else if (user.photo === null) {
      photo = null;
    }

    let status: StatusEntity | undefined = undefined;

    if (user.status) {
      status = new StatusEntity();
      status.id = Number(user.status.id);
    }

    const userEntity = new UserEntity();
    if (user.id && typeof user.id === 'number') {
      userEntity.id = user.id;
    }
    userEntity.email = user.email;
    userEntity.password = user.password;
    userEntity.previousPassword = user.previousPassword;
    userEntity.firstName = user.firstName;
    userEntity.lastName = user.lastName;
    userEntity.photo = photo;
    userEntity.role = role;
    userEntity.status = status;
    userEntity.createdAt = user.createdAt;
    userEntity.updatedAt = user.updatedAt;
    userEntity.deletedAt = user.deletedAt;
    return userEntity;
  }
}
