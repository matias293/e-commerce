import knex from 'knex';


export const sqliteDB = knex({
    client: 'sqlite3',
    connection: { filename: './shop.sqlite' }
  });
  

  sqliteDB.schema.hasTable('carrito').then((exists) => {
    if (!exists) {
      console.log('NO EXISTE LA TABLA MENSAJE. VAMOS A CREARLA');
      sqliteDB.schema
        .createTable('productos', (carritosTable) => {
            carritosTable.increments('_id');
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
    async get(id?: string): Promise<IItem | IItem[]> {
    
          if (id) {
            const producto = await sqliteDB('carrito').where(
              'id',
              Number(id)
            );
            return producto[0];
          }
          return sqliteDB('carrito');
    }

    
}