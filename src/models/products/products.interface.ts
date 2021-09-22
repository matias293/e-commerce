export interface newProductI {
  nombre?: string;
  precio?: number;
  descripcion?:string;
  codigo?:string;
  foto?:string;
  stock?:number;
 
  
}

export interface ProductI {
    _id?: string;
    id?:string
    nombre?: string;
    precio?: number;
    descripcion?:string;
    codigo?:string;
    foto?:string;
    stock?:number;
    timestamp?:number
  
}

export interface ProductQuery {
  nombre?: string;
  codigo?: string;
  precio?:number;
  stock?:number;
  minPrecio?:number;
  maxPrecio?:number;
  minStock?:number
  maxStock?:number;
}

export interface ProductBaseClass {
  get(id?: string | undefined): Promise<ProductI[]>;
  add(data: newProductI): Promise<ProductI>;
  update(id: string, newProductData: newProductI): Promise<ProductI>;
  delete(id: string): Promise<void>;
  query(options: ProductQuery): Promise<ProductI[]>;
}
