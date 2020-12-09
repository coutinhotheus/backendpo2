import { getRepository } from 'typeorm';

import Compras from '../models/Compras';
import Produtos from '../models/Produtos';
import Fornecedores from '../models/Fornecedores';

interface Update {
  id: string;
  data_emissao?: string;
  id_produto?: string;
  id_fornecedor?: string;
  quantidade?: number;
  valor_unitario?: number;
}

interface Request {
  data_emissao: string;
  id_produto: string;
  id_fornecedor: string;
  quantidade: number;
  valor_unitario: number;
}

class ComprasController {
  public async store({
    data_emissao,
    id_produto,
    id_fornecedor,
    quantidade,
    valor_unitario,
  }: Request): Promise<Compras> {
    const ComprasRepository = getRepository(Compras);
    const ProdutosRepository = getRepository(Produtos);
    const FornecedoresRepository = getRepository(Fornecedores);

    const produto = await ProdutosRepository.findOne(id_produto);
    const fornecedor = await FornecedoresRepository.findOne(id_fornecedor);

    if (!produto) {
      throw new Error('Produto Invalido');
    }

    if (!fornecedor) {
      throw new Error('Pornecedor Invalido');
    }

    const compras = ComprasRepository.create({
      data_emissao,
      id_produto,
      id_fornecedor,
      quantidade,
      valor_unitario,
    });

    await ComprasRepository.save(compras);
    return compras;
  }

  public async update({
    id,
    data_emissao,
    id_produto,
    id_fornecedor,
    quantidade,
    valor_unitario,
  }: Update): Promise<Compras> {
    const ComprasRepository = getRepository(Compras);

    const compras = await ComprasRepository.findOne(id);

    if (!compras) {
      throw new Error('Agendamento não encontrado');
    }
    if (data_emissao) {
      compras.data_emissao = data_emissao;
    }
    if (id_produto) {
      compras.id_produto = id_produto;
    }
    if (id_fornecedor) {
      compras.id_fornecedor = id_fornecedor;
    }
    if (quantidade) {
      compras.quantidade = quantidade;
    }
    if (valor_unitario) {
      compras.valor_unitario = valor_unitario;
    }

    await ComprasRepository.save(compras);
    return compras;
  }
}

export default ComprasController;
