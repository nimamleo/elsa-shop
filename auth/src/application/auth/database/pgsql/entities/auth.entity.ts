import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IAuth, IAuthEntity } from '../../../models/auth.model';

@Entity('auth')
export class AuthEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint', unsigned: true })
  id: number;

  @Column({ type: 'bigint', unsigned: true, unique: true })
  userId: number;

  @Column({ type: 'text' })
  refreshToken: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIAuth(iAuth: IAuth): AuthEntity {
    if (!iAuth) {
      return null;
    }

    const auth = new AuthEntity();
    auth.userId = Number(iAuth.userId);
    auth.refreshToken = iAuth.refreshToken;
    return auth;
  }

  static toIAuthEntity(auth: AuthEntity): IAuthEntity {
    if (!auth) {
      return null;
    }

    return {
      id: auth.id.toString(),
      userId: auth.userId.toString(),
      refreshToken: auth.refreshToken,
      createdAt: auth.createdAt,
      updatedAt: auth.updatedAt,
    };
  }
}
