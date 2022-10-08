import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import User from './user';

@Entity()
export default class Slide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: ''
  })
  name: string;

  @Column('simple-json')
  content: any;

  @ManyToOne(type => User, user => user.slides, {
    cascade: true
  })
  user: User;

  @Column({
    default: false
  })
  isPublished: boolean;

  @Column({
    default: false
  })
  isOnPlay: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
