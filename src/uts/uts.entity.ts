import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Uts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  nama: string;

  @Column({ type: 'varchar' })
  merekMobil: string;

  @Column({ type: 'varchar' })
  tipeMobil: string;

  @Column({ type: 'int' })
  harga: number;

  @Column({ type: 'int' })
  tahun: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
