import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Slide from './slide';

@Entity()
export default class Session {
  @PrimaryGeneratedColumn('uuid')
  sessionId: string;

  @OneToOne(() => Slide, slide => slide.session, {
    cascade: true
  })
  @JoinColumn()
  slide: Slide;

  @Column({
    default: 0
  })
  currentPage: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
