import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ISize, ISizeEntity } from '../../../models/size.model';
import { InfoEntity } from './info.entity';

@Entity('size')
export class SizeEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => InfoEntity, (x) => x.size)
  info: InfoEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromISize(iSize: ISize): SizeEntity {
    if (!iSize) {
      return null;
    }

    const size = new SizeEntity();

    size.title = iSize.title;

    return size;
  }

  static toISizeEntity(size: SizeEntity): ISizeEntity {
    if (!size) {
      return null;
    }

    return {
      id: size.id.toString(),
      title: size.title,
      info:
        size.info && size.info.length > 0
          ? size.info.map((x) => InfoEntity.toIInfoEntity(x))
          : [],
      createdAt: size.createdAt,
      updatedAt: size.updatedAt,
    };
  }
}
