import { Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';
import { v1 } from 'uuid';

@Entity()
export class CommonEntity {
  @PrimaryColumn()
  id: string = v1();
}
