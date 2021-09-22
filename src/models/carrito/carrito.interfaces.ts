export interface CarritoI {
    id:string;
    timestamp:number
    products:ProductI[]

}

export interface ProductC {
    
    nombre: string;
    precio: number;
    descripcion:string;
    codigo:string;
    foto:string;
    stock:number;
   
  
}

 export interface ProductI {
    _id: string;
    nombre: string;
    precio: number;
    descripcion:string;
    codigo:string;
    foto:string;
    stock:number;
    timestamp:number
  
}

export interface newProductI {
    nombre?: string;
    precio?: number;
    descripcion?:string;
    codigo?:string;
    foto?:string;
    stock?:number;
   
    
  }

