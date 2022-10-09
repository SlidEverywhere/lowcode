import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import User from './user';
import Session from './session';
@Entity()
export default class Slide {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    default: ''
  })
  name: string;

  @Column({
    default: ''
  })
  cover: string;

  @Column('simple-json', {
    select: false
  })
  content: any;

  @ManyToOne(type => User, user => user.slides, {
    cascade: true
  })
  user: User;

  @OneToOne(() => Session, session => session.slide)
  session: Session;

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
