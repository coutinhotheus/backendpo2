import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import Produtos from './Produtos';
import Fornecedores from './Fornecedores';

@Entity('compras')
class Compras {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  data_emissao: string;

  @Column()
  id_produto: string;

  @ManyToOne(() => Produtos)
  @JoinColumn({ name: 'id_produto' })
  produto_id: Produtos;

  @Column()
  id_fornecedor: string;

  @ManyToOne(() => Fornecedores)
  @JoinColumn({ name: 'id_fornecedor' })
  fornecedor_id: Fornecedores;

  @Column()
  quantidade: number;

  @Column()
  valor_unitario: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Compras;
