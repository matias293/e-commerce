import { v4 as uuidv4 } from 'uuid';
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../../products.interface';

export class ProductosMemDAO implements ProductBaseClass {
  private productos: ProductI[] = [];

  constructor() {
    this.productos = []
  }

  findIndex(id: string) {
    return this.productos.findIndex((aProduct) => aProduct._id == id);
  }

  find(id: string): ProductI | undefined {
    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductI[]> {
    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    
    return this.productos;
  }

  async add(data: newProductI): Promise<ProductI> {
    const {nombre,precio,descripcion,codigo,foto,stock} = data

    if (!nombre || !precio || !descripcion || !codigo || !stock || !foto ) throw new Error('invalid data or empty data');

    const newItem: ProductI = {
      _id: uuidv4(),
      nombre ,
      precio,
      descripcion,
      codigo,
      foto,
      stock,
      timestamp: Date.now()
    };

    this.productos.push(newItem);

    return newItem;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    const index = this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);
    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.productos.splice(index, 1);
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    const productos:ProductI[] = await this.get()
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);

    if (options.codigo)
      query.push((aProduct: ProductI) => aProduct.codigo == options.codigo);
    
    if (options.minPrecio)
      query.push((aProduct: ProductI) => aProduct.precio >= (options.minPrecio as number));  
    
    if (options.maxPrecio)
      query.push((aProduct: ProductI) => aProduct.precio <= (options.maxPrecio as number));  
    
    if (options.minStock)
      query.push((aProduct: ProductI) => aProduct.stock == (options.minStock as number));  
    
      if (options.maxStock)
      query.push((aProduct: ProductI) => aProduct.stock == (options.maxStock as number));  

    return productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
