import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser, IUserEntity } from '../../../models/user.model';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  firstName: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  lastName: string;

  @Column({ type: 'varchar', length: 255, unique: true })
  phone: string;

  @Column({ type: 'text', nullable: true })
  address: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIUser(iUser: IUser): UserEntity {
    if (!iUser) {
      return null;
    }

    const user = new UserEntity();
    user.firstName = iUser.firstName;
    user.lastName = iUser.lastName;
    user.phone = iUser.phone;
    user.address = iUser.address;
    return user;
  }

  static toIUserEntity(userEntity: UserEntity): IUserEntity {
    if (!userEntity) {
      return null;
    }

    return {
      id: userEntity.id.toString(),
      firstName: userEntity.firstName,
      lastName: userEntity.lastName,
      phone: userEntity.phone,
      address: userEntity.address,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };
  }
}
