import knex from 'knex';
import {ProductC} from '../carrito.interfaces'

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


  mySQLDB.schema.hasTable('carritos').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA CARRITO. VAMOS A CREARLA');
      mySQLDB.schema
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

export class CarritoMysqlDAO{
    async get(id?: string): Promise<ProductC | ProductC[]> {
    
          if (id) {
            const producto = await mySQLDB('carritos').where(
              'id',
              Number(id)
            );
            return producto[0];
          }
          return mySQLDB('carritos');
    }

    async add(id: string): Promise<ProductC> {
      
          const producto = await this.get(id);
          
          if (producto) {
            
            throw new Error(
              'El producto que quiere ingresar ya se encuentra'
            );
          } else {
            
            const product = await mySQLDB('productos').where(
              'id',
              Number(id)
            );
            if (product.length) {
              const productAgregado = await mySQLDB('carritos').insert(
                product[0]
              );
              const nuevoProducto:ProductC | unknown  = await this.get(
                productAgregado[0] as unknown as string
              );
              return nuevoProducto
            } else {
              throw new Error('El producto no existe');
            }
          }
        
      }

      async delete(id: string): Promise<ProductC[]> {
        
          const productDeleted = await mySQLDB('carritos')
            .where('id', Number(id))
            .del();
          if (!productDeleted) {
            throw new Error(
              'El producto que quiere eliminar no se encuentra en su carrito'
            );
          } else {
            const productsInCart = await this.get();
            return productsInCart as ProductC[];
          }
       
      }


}