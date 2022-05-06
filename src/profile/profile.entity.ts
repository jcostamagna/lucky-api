import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  JoinColumn,
} from 'typeorm';
import { UserEntity } from '@app/user/user.entity';
import { AddressEntity } from '@app/address/address.entity';

@Entity({ name: 'profile' })
export class ProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;

  @OneToOne(() => AddressEntity, { eager: true })
  @JoinColumn()
  address: AddressEntity;

  @Column()
  name: string;
}
