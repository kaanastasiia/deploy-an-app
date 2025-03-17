import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('integer')
  userId: number;

  @Column('text')
  name: string;

  @Column('text', { nullable: true })
  path: string | null;
}
