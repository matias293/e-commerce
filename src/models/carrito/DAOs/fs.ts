import { v4 as uuidv4 } from 'uuid';

import fs from 'fs'
import {ProductosMemDAO} from '../../../models/products/DAOs/products/memory'
import {CarritoI,ProductC,ProductI} from '../carrito.interfaces'
import {productsAPI} from '../../../apis/productos'



export class CarritoFSDAO  {

    public carrito:    CarritoI[] = []
    public carritoOld: CarritoI[] = []
    public productos:  ProductI[] = []
    public fileName:   string
   
  
    constructor(filePath:string){
    this.fileName = filePath
     this.carrito = []
     this.carritoOld = []
     this.productos = []
     this.actualizado()
    }
  
    actualizado = () => {
      const data =  this.readFile()
         if(data){
             const productos = JSON.parse(data)
             this.carritoOld = productos
             this.carrito.push({id:uuidv4() ,timestamp:Date.now(),products:this.productos})
             
         }
        else {
        
          this.carrito.push({id:uuidv4() ,timestamp:Date.now(),products:this.productos})
           
        }
    }
  
    guardar = () => {
      if(this.carritoOld.length === 0){
        this.writeFile(this.carrito)
      }
      else{
        
       const carro = this.carritoOld.concat(this.carrito)
       this.writeFile(carro)
        
      }
    }
  
    delete = (id:string) =>{
      const productos = this.productos
       
      const productosNuevos:Array<ProductI> =  productos.filter(prod => prod._id !== id)
        
        this.productos = productosNuevos
        this.carrito[0].products = this.productos
        this.guardar()
    
    }
  
    add = async(id:string): Promise<ProductI> => {  
      const Producto =  productsAPI
      const productos = await  Producto.getProducts()
      const producto  = productos.find(prod=> prod._id == id )
      if(!producto){
        throw new Error('El producto no existe')
      }
     else{
       this.productos.push(producto)
       this.guardar()
       return producto as ProductI
     }
    }
    
    getCarritos = (id:string) => {
        const carros  = this.leer()
        const carrito = carros.find(prod => prod.id === id )
        return carrito
    }
    
    leer = () =>{  
   
     if(this.carritoOld.length === 0){
       return this.carrito
     }
     else {
       
        return this.carritoOld.concat(this.carrito)
     }
    }
  
    writeFile = (carro:CarritoI[]) => {
      try {
      
        return fs.writeFileSync(this.fileName,carro,null,'\t')
        
      } catch (error) {
        console.log('No se pudo escribir el archivo ', error)
      }
    }
  
    readFile = () =>{
      try {
        return fs.readFileSync(this.fileName,'utf-8')
      } catch (error) {
        console.log('No se pudo leer el archivo ', error)
      }
    }
}// 

