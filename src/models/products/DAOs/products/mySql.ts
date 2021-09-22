import knex from 'knex';
import {
    newProductI,
    ProductI,
    ProductBaseClass,
    ProductQuery,
  } from '../../products.interface';

  export const mySQLDB = knex({
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: '',
      database: 'ecommerce',
    },
    pool: { min: 0, max: 7 },
  });

export class ProductosMysqlDAO implements ProductBaseClass {
    
    
    async get(id?: string): Promise<ProductI[]> {}
    async add(id?: string): Promise<ProductI[]> {}
     async delete (id?: string): Promise<ProductI[]> {}
   
        


}