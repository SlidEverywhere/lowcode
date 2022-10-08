import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import Slide from './slide';
@Entity()
export default class User {
  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  username: string;

  // 查询时默认不被选中
  @Column({
    select: false,
    default: ''
  })
  password: string;

  @Column({
    default: ''
  })
  avatar: string;

  @Column({
    default: ''
  })
  birthday: string;

  @Column({
    default: 0
  })
  sex: number;

  @Column({
    default: ''
  })
  nickname: string;

  @OneToMany(type => Slide, slide => slide.user)
  slides: Slide[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
