import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { CountryEntity } from '@app/address/country.entity';

@Entity({ name: 'city' })
export class CityEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => CountryEntity)
  @JoinColumn()
  country: CountryEntity;

  @Column()
  name: string;
}
