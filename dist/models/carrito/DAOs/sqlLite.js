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
exports.CarritoSqliteDAO = exports.sqliteDB = void 0;
const knex_1 = __importDefault(require("knex"));
exports.sqliteDB = knex_1.default({
    client: 'sqlite3',
    connection: { filename: './shop.sqlite' }
});
exports.sqliteDB.schema.hasTable('carrito').then((exists) => {
    if (!exists) {
        console.log('NO EXISTE LA TABLA MENSAJE. VAMOS A CREARLA');
        exports.sqliteDB.schema
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
class CarritoSqliteDAO {
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const producto = yield exports.sqliteDB('carrito').where('id', Number(id));
                return producto[0];
            }
            return exports.sqliteDB('carrito');
        });
    }
}
exports.CarritoSqliteDAO = CarritoSqliteDAO;
//# sourceMappingURL=sqlLite.js.map