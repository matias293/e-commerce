import { v4 as uuidv4 } from 'uuid';

import {ProductosMemDAO} from '../../../models/products/DAOs/products/memory'
import {CarritoI,ProductI} from '../carrito.interfaces'
import {productsAPI} from '../../../apis/productos'

export class CarritoMemDAO {
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
    

    const allProducts:ProductI[] = await productsAPI.getProducts()
    
    const producto =  allProducts.find((prod: ProductI)=> prod._id == id)
  
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
