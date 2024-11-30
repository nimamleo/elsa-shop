import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { InfoEntity } from './info.entity';
import { ICountry, ICountryEntity } from '../../../models/country.model';
import { ProductEntity } from './product.entity';

@Entity('country')
export class CountryEntity {
  @PrimaryGeneratedColumn('increment', { type: 'bigint' })
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @OneToMany(() => ProductEntity, (x) => x.country)
  product: ProductEntity[];

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
      product:
        country.product && country.product.length > 0
          ? country.product.map((x) => ProductEntity.toIProductEntity(x))
          : [],
      createdAt: country.createdAt,
      updatedAt: country.updatedAt,
    };
  }
}
