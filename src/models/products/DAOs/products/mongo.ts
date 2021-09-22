import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config()
import {
  newProductI,
  ProductI,
  ProductBaseClass,
  ProductQuery,
} from '../../products.interface';


const productsSchema = new mongoose.Schema<ProductI>({
  nombre: String,
  precio: Number,
  descripcion:String,
  codigo:String,
  foto:String,
  stock:Number
})

export const productoModelo = mongoose.model<ProductI>('producto', productsSchema)


export class ProductosCompassDAO implements ProductBaseClass {
  private srv: string;
  private productos;

  constructor(local: boolean = false) {
    if (local)
      this.srv = `mongodb://localhost:27017/${process.env.MONGO_LOCAL_DBNAME}`;
    else
      this.srv = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@coder2daentrega.itkwg.mongodb.net/Shop`;
    mongoose.connect(this.srv);
    this.productos = mongoose.model<ProductI>('producto', productsSchema);
    
  }

  async get(id?: string): Promise<ProductI[]> {
    let output: ProductI[] = [];
    try {
      if (id) {
        const document = await this.productos.findById(id);
        if (document) output.push(document);
      } else {
        output = await this.productos.find();
      }

      return output;
    } catch (err) {
      return output;
    }
  }

  async add(data: newProductI): Promise<ProductI> {
    if (!data.nombre || !data.precio) throw new Error('invalid data');

    const newProduct = new this.productos(data);
    await newProduct.save();

    return newProduct;
  }

  async update(id: string, newProductData: newProductI): Promise<ProductI> {
    return this.productos.findByIdAndUpdate(id, newProductData);
  }

  async delete(id: string) {
    await this.productos.findByIdAndDelete(id);
  }

  async query(options: ProductQuery): Promise<ProductI[]> {
    let query: ProductQuery = {};

    if (options.nombre) query.nombre = options.nombre;

    if (options.precio) query.precio = options.precio;

    return this.productos.find(query);
  }
}
