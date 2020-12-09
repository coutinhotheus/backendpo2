import { getRepository } from 'typeorm';

import Fornecedores from '../models/Fornecedores';

interface Update {
  id: string;
  nome?: string;
  telefone?: string;
  email?: string;
}

interface Request {
  nome: string;
  telefone: string;
  email: string;
}

class FornecedoresController {
  public async store({
    nome,
    telefone,
    email,
  }: Request): Promise<Fornecedores> {
    const FornecedoresRepository = getRepository(Fornecedores);

    const fornecedor = FornecedoresRepository.create({
      nome,
      telefone,
      email,
    });

    await FornecedoresRepository.save(fornecedor);
    return fornecedor;
  }

  public async update({
    id,
    nome,
    telefone,
    email,
  }: Update): Promise<Fornecedores> {
    const FornecedoresRepository = getRepository(Fornecedores);

    const fornecedor = await FornecedoresRepository.findOne(id);

    if (!fornecedor) {
      throw new Error('Fornecedor não encontrado');
    }

    if (nome) {
      fornecedor.nome = nome;
    }
    if (telefone) {
      fornecedor.telefone = telefone;
    }
    if (email) {
      fornecedor.email = email;
    }

    await FornecedoresRepository.save(fornecedor);
    return fornecedor;
  }
}

export default FornecedoresController;
