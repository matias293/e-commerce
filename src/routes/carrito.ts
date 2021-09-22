import { Router } from 'express';
import asyncHandler from 'express-async-handler';

import {carritoController} from '../controllers/carrito'


const router = Router();

router.get('/listar',  asyncHandler(carritoController.getCarritos) );

router.get('/listar/:id', asyncHandler(carritoController.getCarritos));

router.post('/agregar/:id', asyncHandler(carritoController.addCarritoProduct));

router.delete('/borrar/:id',asyncHandler(carritoController.deleteCarritoProduct));

export default router;
