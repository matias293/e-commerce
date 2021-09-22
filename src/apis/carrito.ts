import {NoticiasFactoryDAO, TipoPersistencia } from '../models/carrito/carrito.factory'
import {CarritoI, ProductI} from '../models/carrito/carrito.interfaces'


/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = TipoPersistencia.SQLITE3;

class carAPI {
  private carritos;

  constructor() {
    this.carritos = NoticiasFactoryDAO.get(tipo);
  }

  async getCarritos(id: string | undefined = undefined): Promise<ProductI[]> {
    
    if (id) return this.carritos.get(id);

    return this.carritos.get();
  }

  async addProductCarrito(id: string): Promise<ProductI> {
    const newProduct = await this.carritos.add(id);
   
    return newProduct;
  }

  async deleteProductCarrito(id: string) {
    await this.carritos.delete(id);
  }

 
}

export const carritoApi = new carAPI();
