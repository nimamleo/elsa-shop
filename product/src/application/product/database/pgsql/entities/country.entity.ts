import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InfoEntity } from './info.entity';
import { ICountry, ICountryEntity } from '../../../models/country.model';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => InfoEntity, (x) => x.country)
  info: InfoEntity[];

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date;

  static fromICountry(iCountry: ICountry): CountryEntity {
    if (!iCountry) {
      return null;
    }

    const quality = new CountryEntity();

    quality.title = iCountry.title;

    return quality;
  }

  static toICountryEntity(country: CountryEntity): ICountryEntity {
    if (!country) {
      return null;
    }

    return {
      id: country.id.toString(),
      title: country.title,
      info:
        country.info && country.info.length > 0
          ? country.info.map((x) => InfoEntity.toIInfoEntity(x))
          : [],
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    };
  }
}
