export interface CarritoI {
    id:string;
    timestamp:number
    cart:ProductI[]

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

export interface CarritoBaseClass {
    get(id?: string | undefined);
    add(id: string);
    delete(id: string): ;
   
  }