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
    
  async get(id?: string): Promise<ProductI[]> {
        
    if (id) {
      const producto = await mySQLDB.from('productos').where({ id }).select()
      return producto;
    }
    return mySQLDB('productos').select();
 
 

}
async add(data: newProductI): Promise<ProductI> {
const productoItem  = await  mySQLDB.from('productos').insert(data)


 const producto = await this.get(productoItem.toString())

 const productNew = producto[0]


return productNew
}

async update(id: string, newProductData: newProductI): Promise<ProductI> {
 await mySQLDB.from('productos').where({ id }).update(newProductData);
 const producto = await this.get(id)
 const productoActualizado = producto
return productoActualizado[0]
}

async delete(id: string): Promise<void> {
return await mySQLDB.from('productos').where({ id }).del(); ;
}

async query(options: ProductQuery): Promise<ProductI[]> {
const products = await mySQLDB('productos')
.modify((queryBuilder) => {
  if (options.nombre) { 
    queryBuilder.where('nombre', options.nombre);
  }
})
.modify((queryBuilder) => {
  if (options.codigo) {
    queryBuilder.where('codigo', options.codigo);
  }
})
.modify((queryBuilder) => {
  if (options.minPrecio) {
    queryBuilder.where('precio', '>=', options.minPrecio);
  }
})
.modify((queryBuilder) => {
  if (options.maxPrecio) {
    queryBuilder.where('precio', '<=', options.maxPrecio);
  }
})
.modify((queryBuilder) => {
  if (options.minStock) {
    queryBuilder.where('stock', '>=', options.minStock);
  }
})
.modify((queryBuilder) => {
  if (options.maxStock) {
    queryBuilder.where('stock', '<=', options.maxStock);
  }
})
return products
}
}