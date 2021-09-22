import mongoose,{Schema} from 'mongoose';
import moment from 'moment'
import dotenv from 'dotenv'
dotenv.config()

import {productoModelo} from '../../products/DAOs/products/mongo'
import {CarritoI,ProductI} from '../carrito.interfaces'



const carritoSchema = new mongoose.Schema({
    
    timestamp:{ type: String, default: moment().format('DD/MM/YYYY HH:mm:ss') },
    products:  [
          {
            productId: {
              type: Schema.Types.ObjectId,
              ref: 'Product',
              
            }
          }
        ]
      
  })

  carritoSchema.methods.toJSON = function() {
    const { __v, ...data  } = this.toObject();
    return data;
}

  export class CarritoCompassDAO{
    private srv: string;
    private carrito;
    private productos
    private carro
  
    constructor(local: boolean = false) {
        
      if (local)
        this.srv = `mongodb://localhost:27017/${process.env.MONGO_LOCAL_DBNAME}`;
      else
        this.srv = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@coder2daentrega.itkwg.mongodb.net/Shop`;
      mongoose.connect(this.srv);
      this.carrito = mongoose.model('carrito', carritoSchema);
      this.carro 
      this.productos = productoModelo
      this.actualizado()
      
    }
    actualizado= async()=>{
      const newCarrito = new this.carrito();
      await newCarrito.save()
       this.carro = newCarrito
    return newCarrito;
    }

    add = async(id:string) => {
      const productoExiste = await this.productos.findById(id) 
      
      if(productoExiste){
        this.carro.products.push(productoExiste)
        await this.carro.save()
      }
      else{
        throw new Error('No existe producto con ese id')
      }
    }

    get = async(id:string | undefined) => {
      
      if(id) {
       const carro = await this.carrito.findById(id)
       
       return carro.products
      }
      else{
      const carros =  await this.carrito.find()
      return carros
      } 
    }

    delete = async(id:string) => {
      console.log(this.carro.products)
      console.log(this.carro)
      console
     const nuevoArray= this.carro.products.filter(prod =>{ 
       console.log(prod._id.str)
       prod._id !==  id})
     console.log(nuevoArray)

    }
  }