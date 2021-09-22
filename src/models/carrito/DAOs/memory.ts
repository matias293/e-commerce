import { v4 as uuidv4 } from 'uuid';

import {ProductosMemDAO} from '../../../models/products/DAOs/products/memory'
import {CarritoI,ProductI,CarritoBaseClass} from '../carrito.interfaces'

export class CarritoMemDAO implements CarritoBaseClass {
  private carrito: CarritoI[] = [];
  private productos:ProductI[]=[]

  constructor() {
    this.carrito = []
    this.productos= []
    this.actualizado()
  }
  actualizado(){
      
    this.carrito.push({
        id:uuidv4() ,
        timestamp:Date.now(),
        products: this.productos
    })
    
  }
  findIndex(id: string) {
    return this.carrito.findIndex((aProduct) => aProduct._id == id);
  }


  async get(id?: string): Promise<ProductI[]> {
    
    if (id) {
      return this.productos.filter((aProduct) => aProduct._id === id);
    }
    return this.productos;
  }

  async add(id:string): Promise<ProductI> {
    const productos = new ProductosMemDAO()

    const allProducts:ProductI[] = await productos.get(id)
    console.log(allProducts,'all')
    const producto =  allProducts.find((prod: ProductI)=> prod._id == id)
   console.log(producto,'prod')
    if(!producto){
        throw new Error('El producto no existe')
    }

    this.productos.push(producto);

    return producto;
  }

 

  async delete(id: string): Promise<void> {
    const index = this.findIndex(id);
    this.carrito.splice(index, 1);
  }

}
