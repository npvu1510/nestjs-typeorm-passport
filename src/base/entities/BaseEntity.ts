import { CreateDateColumn, Entity, UpdateDateColumn } from 'typeorm';
import { CommonEntity } from './CommonEntity';

@Entity()
export class BaseEntiy extends CommonEntity {
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
