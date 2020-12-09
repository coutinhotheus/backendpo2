/* eslint-disable prefer-const */
/* eslint-disable no-await-in-loop */
import { Router } from 'express';

import { getRepository } from 'typeorm';
import ComprasController from '../app/controllers/ComprasController';
import Compras from '../app/models/Compras';
import Produtos from '../app/models/Produtos';
import Fornecedores from '../app/models/Fornecedores';

const comprasRouter = Router();

comprasRouter.post('/', async (request, response) => {
  try {
    const {
      data_emissao,
      id_produto,
      id_fornecedor,
      quantidade,
      valor_unitario,
    } = request.body;

    const comprasController = new ComprasController();
    const compras = await comprasController.store({
      data_emissao,
      id_produto,
      id_fornecedor,
      quantidade,
      valor_unitario,
    });

    return response.json(compras);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

comprasRouter.get('/', async (request, response) => {
  const comprasController = getRepository(Compras);
  const produtosController = getRepository(Produtos);
  const fornecedoresController = getRepository(Fornecedores);

  const comprasComplet = [];
  const compras = await comprasController.find();

  // eslint-disable-next-line guard-for-in
  for (const i in compras) {
    const produtos = await produtosController.findOne({
      where: { id: compras[i].id_produto },
    });
    const fornecedores = await fornecedoresController.findOne({
      where: { id: compras[i].id_fornecedor },
    });

    if (produtos && fornecedores) {
      const comprasComplete = {
        idCompra: compras[i].id,
        dataEmissao: compras[i].data_emissao,
        nomeProduto: produtos.nome,
        nomeFornecedor: fornecedores.nome,
        Quantidade: compras[i].quantidade,
        valorUnitario: compras[i].valor_unitario,
        valorTotal: compras[i].quantidade * compras[i].valor_unitario,
      };
      comprasComplet.push(comprasComplete);
    }
  }

  return response.json(comprasComplet);
});

comprasRouter.get('/:id', async (request, response) => {
  try {
    const comprasController = getRepository(Compras);
    const produtosController = getRepository(Produtos);
    const fornecedoresController = getRepository(Fornecedores);

    let listID = {};

    const { id } = request.params;
    const compras = await comprasController.findOne(id);

    const produto = await produtosController.findOne({
      where: { id: compras?.id_produto },
    });

    const fornecedor = await fornecedoresController.findOne({
      where: { id: compras?.id_produto },
    });

    if (produto && fornecedor && compras) {
      listID = {
        idCompra: compras.id,
        dataEmissao: compras.data_emissao,
        nomeProduto: produto.nome,
        nomeFornecedor: fornecedor.nome,
        Quantidade: compras.quantidade,
        valorUnitario: compras.valor_unitario,
        valorTotal: compras.quantidade * compras.valor_unitario,
      };
    }

    return response.json(listID);
  } catch (erro) {
    return response.json('Compra nao encontrada.');
  }
});

comprasRouter.delete('/:id', async (request, response) => {
  try {
    const comprasController = getRepository(Compras);
    const { id } = request.params;

    await comprasController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Compra não encontrada.');
  }
});

comprasRouter.patch('/:id', async (request, response) => {
  try {
    const id = request.params;
    const {
      data_emissao,
      id_produto,
      id_fornecedor,
      quantidade,
      valor_unitario,
    } = request.body;

    const comprasController = new ComprasController();
    const medicos = await comprasController.update({
      id,
      data_emissao,
      id_produto,
      id_fornecedor,
      quantidade,
      valor_unitario,
    });

    return response.json(medicos);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

export default comprasRouter;
