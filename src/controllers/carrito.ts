import { Request, Response, NextFunction } from 'express';
import { carritoApi } from '../apis/carrito';
import { ProductQuery } from '../models/products/products.interface';

class Carrito {
  
  async getCarritos(req: Request, res: Response) {
    const { id } = req.params;
    
    if (id) {
      
      const result = await carritoApi.getCarritos(id);
      
      if (!result.length){
        
        return res.status(404).json({
          data: 'No tiene productos en su carrito',
        });
      }

      return res.json({
        data: result,
      });
    }
    const carro = await carritoApi.getCarritos()
    if(!carro.length){
      return res.status(404).json({
        data: 'No hay productos en el carrito',
      });
    }

    res.json({
      data: carro
    });
  }

  async addCarritoProduct(req: Request, res: Response) {
    const {id} = req.params

    const newItem = await carritoApi.addProductCarrito(id);

    res.json({
      msg: 'Producto agregado con exito',
      data: newItem,
    });
  }

  

  async deleteCarritoProduct(req: Request, res: Response) {
    const id = req.params.id;
    await carritoApi.deleteProductCarrito(id);
    res.json({
      msg: 'Producto borrado',
    });
  }
}

export const carritoController = new Carrito();