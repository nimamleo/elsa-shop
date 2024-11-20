import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IColor, IColorEntity } from '../../../models/color.model';
import { InfoEntity } from './info.entity';

@Entity('color')
export class ColorEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  hex: string;

  @OneToMany(() => InfoEntity, (x) => x.colorId)
  info: InfoEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromIColor(iColor: IColor): ColorEntity {
    if (!iColor) {
      return null;
    }

    const color = new ColorEntity();

    color.title = iColor.title;
    color.hex = iColor.hex;

    return color;
  }

  static toIColorEntity(color: ColorEntity): IColorEntity {
    if (!color) {
      return null;
    }

    return {
      id: color.id.toString(),
      title: color.title,
      hex: color.hex,
      info:
        color.info && color.info.length > 0
          ? color.info.map((x) => InfoEntity.toIInfoEntity(x))
          : [],
      createdAt: color.createdAt,
      updatedAt: color.updatedAt,
    };
  }
}
