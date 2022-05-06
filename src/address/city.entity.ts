import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CountryEntity } from '@app/address/country.entity';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CountryEntity, { eager: true })
  @JoinColumn()
  country: CountryEntity;

  @Column()
  name: string;
}
