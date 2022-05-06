import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'country' })
export class CountryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
