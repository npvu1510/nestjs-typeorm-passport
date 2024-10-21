import { extend } from 'joi';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v1 } from 'uuid';

@Entity({ name: 'users' })
export class User extends BaseEntity {
  @PrimaryColumn()
  id: string = v1();

  // credentials
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  // tokens
  @Column({ name: 'refresh_token', type: 'varchar', nullable: true })
  refreshToken: string;

  @Column({ name: 'verify_account_token', type: 'varchar', nullable: true })
  verifyAccountToken: string;

  @Column({ name: 'reset_password_token', type: 'varchar', nullable: true })
  resetPasswordToken: string;

  // time
  @Column({
    name: 'last_password_change',
    type: 'timestamp',
    nullable: true,

    default: () => 'CURRENT_TIMESTAMP',
  })
  lastPasswordChange: Date;
}
