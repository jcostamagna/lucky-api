import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { CityEntity } from '@app/address/city.entity';

@Entity({ name: 'address' })
export class AddressEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  street: string;

  @OneToOne(() => CityEntity)
  @JoinColumn()
  city: CityEntity;
}
