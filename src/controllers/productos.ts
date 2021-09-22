import { Request, Response, NextFunction } from 'express';
import { productsAPI } from '../apis/productos';
import { ProductQuery } from '../models/products/products.interface';

class Producto {
  checkAddProducts(req: Request, res: Response, next: NextFunction) {
    const { nombre, precio, stock,  } = req.body;

    if (!nombre || !precio || typeof nombre !== 'string' || !stock|| isNaN(precio)) {
      return res.status(400).json({
        msg: 'Campos del body invalidos',
      });
    }

    next();
  }

  async checkProductExists(req: Request, res: Response, next: NextFunction) {
    const id = req.params.id;

    const products = await productsAPI.getProducts()
   
    if(products.length === 0){
     return res.status(404).json({
       data: 'No hay productos disponibles',
     });
    }
    const producto = await productsAPI.getProducts(id);
    
    if (producto.length === 0) {
      return res.status(404).json({
        msg: 'Producto no encontrado',
      });
    }
    next();
  }

  async getProducts(req: Request, res: Response) {
    const { id } = req.params;
    const { nombre, codigo, minPrecio, maxPrecio, minStock, maxStock } = req.query;
    
    if (id) {
      
      const result = await productsAPI.getProducts(id);
      
      if (!result.length){
        
        return res.status(404).json({
          data: 'objeto no encontrado',
        });
      }

      return res.json({
        data: result,
      });
    }

    const query: ProductQuery = {};
   

    if (nombre) query.nombre = nombre.toString();

    if (codigo) query.codigo = codigo.toString();

    if (minPrecio) query.minPrecio = Number(minPrecio);

    if (maxPrecio) query.maxPrecio = Number(maxPrecio);

    if (minStock) query.minStock = Number(minStock);

    if (maxStock) query.maxStock = Number(maxStock);
 



    if (Object.keys(query).length) {
      
      return res.json({
        data: await productsAPI.query(query),
      });
    }
  
    res.json({
      data: await productsAPI.getProducts()
    });
  }

  async addProducts(req: Request, res: Response) {
    const newItem = await productsAPI.addProduct(req.body);

    res.json({
      msg: 'Producto agregado con exito',
      data: newItem,
    });
  }

  async updateProducts(req: Request, res: Response) {
    const id = req.params.id;

    const updatedItem = await productsAPI.updateProduct(id, req.body);

    res.json({
      msg: 'Actualizando producto',
      data: updatedItem,
    });
  }

  async deleteProducts(req: Request, res: Response) {
    const id = req.params.id;
    await productsAPI.deleteProduct(id);
    res.json({
      msg: 'Producto borrado',
    });
  }
}

export const productsController = new Producto();
