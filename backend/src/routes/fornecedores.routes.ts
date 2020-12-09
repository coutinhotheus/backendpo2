import { Router } from 'express';

import { getRepository } from 'typeorm';
import FornecedoresController from '../app/controllers/FornecedoresController';
import Fornecedores from '../app/models/Fornecedores';

const fornecedoresRouter = Router();

fornecedoresRouter.post('/', async (request, response) => {
  try {
    const { nome, telefone, email } = request.body;

    const fornecedoresController = new FornecedoresController();
    const fornecedor = await fornecedoresController.store({
      nome,
      telefone,
      email,
    });

    return response.json(fornecedor);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

fornecedoresRouter.get('/', async (request, response) => {
  const fornecedorController = getRepository(Fornecedores);
  const fornecedor = await fornecedorController.find();
  return response.json(fornecedor);
});

fornecedoresRouter.get('/:id', async (request, response) => {
  try {
    const fornecedoresController = getRepository(Fornecedores);
    const { id } = request.params;
    const fornecedor = await fornecedoresController.findOne(id);

    return response.json(fornecedor);
  } catch (erro) {
    return response.json('Fornecedor não encontrado.');
  }
});

fornecedoresRouter.delete('/:id', async (request, response) => {
  try {
    const fornecedoresController = getRepository(Fornecedores);
    const { id } = request.params;

    await fornecedoresController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Fornecedor não encontrado.');
  }
});

fornecedoresRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const { nome, telefone, email } = request.body;

    const fornecedoresController = new FornecedoresController();
    const fornecedor = await fornecedoresController.update({
      id,
      nome,
      telefone,
      email,
    });

    return response.json(fornecedor);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default fornecedoresRouter;
