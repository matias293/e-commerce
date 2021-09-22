"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductosSqliteDAO = exports.sqliteDB = void 0;
const knex_1 = __importDefault(require("knex"));
exports.sqliteDB = knex_1.default({
    client: 'sqlite3',
    connection: { filename: './shop.sqlite' }
});
exports.sqliteDB.schema.hasTable('productos').then((exists) => {
    if (!exists) {
        console.log('NO EXISTE LA TABLA MENSAJE. VAMOS A CREARLA');
        exports.sqliteDB.schema
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
class ProductosSqliteDAO {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const producto = yield exports.sqliteDB.from('productos').where({ id }).select();
                return producto;
            }
            return exports.sqliteDB('productos').select();
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const productoItem = yield exports.sqliteDB.from('productos').insert(data);
            const producto = yield this.get(productoItem.toString());
            const productNew = producto[0];
            return productNew;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield exports.sqliteDB.from('productos').where({ id }).update(newProductData);
            const producto = yield this.get(id);
            const productoActualizado = producto;
            return productoActualizado[0];
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield exports.sqliteDB.from('productos').where({ id }).del();
            ;
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const products = yield exports.sqliteDB('productos')
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
            });
            return products;
        });
    }
}
exports.ProductosSqliteDAO = ProductosSqliteDAO;
//# sourceMappingURL=sqlLite.js.map