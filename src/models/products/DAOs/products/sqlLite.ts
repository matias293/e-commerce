import knex from 'knex';

import {
    newProductI,
    ProductI,
    ProductBaseClass,
    ProductQuery,
  } from '../../products.interface';



export const sqliteDB = knex({
  client: 'sqlite3',
  connection: { filename: './shop.sqlite' }
});

sqliteDB.schema.hasTable('productos').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA MENSAJE. VAMOS A CREARLA');
      sqliteDB.schema
        .createTable('productos', (productosTable) => {
            productosTable.increments('_id');
            productosTable.string('nombre').notNullable();
            productosTable.string('descripcion').notNullable();
            productosTable.string('codigo').notNullable();
            productosTable.decimal('precio', 5, 2).notNullable();
            productosTable.string('foto').notNullable();
            productosTable
              .timestamp('timestamp')
              .defaultTo(Date.now());
            productosTable.integer('stock').notNullable();
        })
        .then(() => {
          console.log('Se creo la tabla mensajes');
        });
    }
  });

export class ProductosSqliteDAO implements ProductBaseClass {


      async get(id?: string): Promise<ProductI[]> {
        
            if (id) {
              const producto = await sqliteDB.from('productos').where({ id }).select()
              return producto;
            }
            return sqliteDB('productos').select();
         
         
        
      }
      async add(data: newProductI): Promise<ProductI> {
        const productoItem  = await  sqliteDB.from('productos').insert(data)
       
       
         const producto = await this.get(productoItem.toString())

         const productNew = producto[0]

        
        return productNew
      }

      async update(id: string, newProductData: newProductI) {
         await sqliteDB.from('productos').where({ id }).update(newProductData);
         const producto = await this.get(id)
         const productoActualizado = producto
        return productoActualizado[0]
      }
   
      async delete(id: string): Promise<void> {
        return await sqliteDB.from('productos').where({ id }).del(); ;
      }
      
  async query(options: ProductQuery): Promise<ProductI[]> {
    const products = await sqliteDB('productos')
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