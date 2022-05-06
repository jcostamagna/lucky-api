import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CityEntity } from '@app/address/city.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @ManyToOne(() => CityEntity, { eager: true })
  @JoinColumn()
  city: CityEntity;
}
