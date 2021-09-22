import { v4 as uuidv4 } from 'uuid';

import fs from 'fs';
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../../products.interface';

export class ProductosFSDAO implements ProductBaseClass {
  private productos: ProductI[] = [];
  private nombreArchivo: string;

  constructor(fileName: string) {
    
    this.nombreArchivo = fileName;
    this.productos = [];
    this.leer(this.nombreArchivo)
  }

  async leer(archivo: string): Promise<void> {
    let fileExists = fs.existsSync(archivo)
   if(fileExists){
    this.productos= JSON.parse(await fs.promises.readFile(archivo, 'utf-8'))
    return
   }
   else{
     this.guardar()
   }

    // this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
  }

  async guardar(): Promise<void> {
   
   await fs.promises.writeFile(
      this.nombreArchivo,
      JSON.stringify(this.productos, null, '\t')
    );
    
  }

  async findIndex(id: string): Promise<number> {
    await this.leer(this.nombreArchivo);
    return this.productos.findIndex((aProduct: ProductI) => aProduct._id == id);
  }

  async find(id: string): Promise<ProductI | undefined> {
    await this.leer(this.nombreArchivo);

    return this.productos.find((aProduct) => aProduct._id === id);
  }

  async get(id?: string): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);

    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(data: newProductI): Promise<ProductI> {
    const {nombre,precio,descripcion,codigo,foto,stock} = data

    if (!nombre || !precio || !descripcion || !codigo || !stock || !foto ) throw new Error('invalid data or empty data');

    await this.leer(this.nombreArchivo);

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

    await this.guardar();

    return newItem;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    const oldProduct = this.productos[index];

    const updatedProduct: ProductI = { ...oldProduct, ...newProductData };
    this.productos.splice(index, 1, updatedProduct);

    await this.guardar();

    return updatedProduct;
  }

  async delete(id: string): Promise<void> {
    await this.leer(this.nombreArchivo);

    const index = await this.findIndex(id);
    this.productos.splice(index, 1);
    await this.guardar();
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    await this.leer(this.nombreArchivo);
    type Conditions = (aProduct: ProductI) => boolean;
    const query: Conditions[] = [];

    if (options.nombre)
      query.push((aProduct: ProductI) => aProduct.nombre == options.nombre);

    if (options.precio)
      query.push((aProduct: ProductI) => aProduct.precio == options.precio);

    return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
  }
}
