import knex from 'knex';

import {ProductI} from '../carrito.interfaces'

export const sqliteDB = knex({
    client: 'sqlite3',
    connection: { filename: './shop.sqlite' }
  });
  

  sqliteDB.schema.hasTable('carritos').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA CARRITO. VAMOS A CREARLA');
      sqliteDB.schema
        .createTable('carritos', (carritosTable) => {
            carritosTable.increments();
            carritosTable.string('nombre').notNullable();
            carritosTable.string('descripcion').notNullable();
            carritosTable.string('codigo').notNullable();
            carritosTable.decimal('precio', 5, 2).notNullable();
            carritosTable.string('foto').notNullable();
            carritosTable
              .timestamp('timestamp')
              .defaultTo(Date.now());
            carritosTable.integer('stock').notNullable();
        })
        .then(() => {
          console.log('Se creo la tabla mensajes');
        });
    }
  });

export class CarritoSqliteDAO{
    async get(id?: string): Promise< ProductI[]|ProductI > {
    
          if (id) {
            const producto = await sqliteDB('carritos').where(
              'id',
              Number(id)
            );
            return producto[0];
          }
          return sqliteDB('carritos');
    }

    async add(id: string): Promise<ProductI> {
      
          const producto = await this.get(id);
          
          if (producto) {
            
            throw new Error(
              'El producto que quiere ingresar ya se encuentra'
            );
          } else {
           
            const product = await sqliteDB('productos').where(
              'id',
              Number(id)
            );
            if (product.length) {
              const productAgregado = await sqliteDB('carritos').insert(
                product[0]
              );
              const nuevoProducto:ProductI | unknown  = await this.get(
                productAgregado[0] as unknown as string
              );
              return nuevoProducto
            } else {
              throw new Error('El producto no existe');
            }
          }
        
      }

      async delete(id: string): Promise<ProductI[]> {
        
          const productDeleted = await sqliteDB('carritos')
            .where('id', Number(id))
            .del();
          if (!productDeleted) {
            throw new Error(
              'El producto que quiere eliminar no se encuentra en su carrito'
            );
          } else {
            const productsInCart = await this.get();
            return productsInCart as ProductI[] ;
          }
       
      }


}