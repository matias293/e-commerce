import {
    newProductI,
    ProductI,
    ProductBaseClass,
    ProductQuery,
  } from '../../products.interface';

export class ProductosMysqlDAO implements ProductBaseClass {
    
    
    async get(id?: string): Promise<ProductI[]> {}
    async add(id?: string): Promise<ProductI[]> {}
     async delete (id?: string): Promise<ProductI[]> {}
   
        


}