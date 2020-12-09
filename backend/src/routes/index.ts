import { Router } from 'express';

import produtosRouter from './produtos.routes';
import fornecedoresRouter from './fornecedores.routes';
import comprasRouter from './compras.routes';

const routes = Router();

routes.use('/produtos', produtosRouter);
routes.use('/fornecedores', fornecedoresRouter);
routes.use('/compras', comprasRouter);

export default routes;
