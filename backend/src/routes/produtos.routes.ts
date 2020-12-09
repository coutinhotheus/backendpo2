import { Router } from 'express';
import multer from 'multer';

import { getRepository } from 'typeorm';
import ProdutosController from '../app/controllers/ProdutosController';
import Produtos from '../app/models/Produtos';
import uploadConfig from '../config/upload';

const upload = multer(uploadConfig);
const produtosRouter = Router();

produtosRouter.post('/', upload.single('foto'), async (request, response) => {
  try {
    const { nome, unidade_medida } = request.body;
    const foto = request.file.filename;

    const produtosController = new ProdutosController();
    const produto = await produtosController.store({
      nome,
      unidade_medida,
      foto,
    });

    return response.json(produto);
  } catch (erro) {
    return response.json({ error: erro.message });
  }
});

produtosRouter.get('/', async (request, response) => {
  const produtosController = getRepository(Produtos);
  const produtos = await produtosController.find();
  return response.json(produtos);
});

produtosRouter.get('/:id', async (request, response) => {
  try {
    const produtosController = getRepository(Produtos);
    const { id } = request.params;
    const produtos = await produtosController.findOne(id);

    return response.json(produtos);
  } catch (erro) {
    return response.json('Produto não encontrado.');
  }
});

produtosRouter.delete('/:id', async (request, response) => {
  try {
    const produtosController = getRepository(Produtos);
    const { id } = request.params;

    await produtosController.delete(id);

    return response.status(204).send();
  } catch (erro) {
    return response.json('Produto não encontrado.');
  }
});

produtosRouter.patch(
  '/:id',
  upload.single('foto'),
  async (request, response) => {
    try {
      const id = request.params;
      const { nome, unidade_medida } = request.body;
      const foto = request.file.filename;

      const produtosController = new ProdutosController();
      const produtos = await produtosController.update({
        id,
        nome,
        unidade_medida,
        foto,
      });

      return response.json(produtos);
    } catch (erro) {
      return response.json({ error: erro.message });
    }
  },
);

export default produtosRouter;
