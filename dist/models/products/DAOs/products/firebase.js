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
exports.ProductosFirebaseDAO = void 0;
const moment_1 = __importDefault(require("moment"));
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const coderFirebase_json_1 = __importDefault(require("../../../../../coderFirebase.json"));
class ProductosFirebaseDAO {
    constructor() {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(coderFirebase_json_1.default)
        });
        this.db = firebase_admin_1.default.firestore();
        this.prodFirebase = this.db.collection('productos');
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let prod = [];
            if (id) {
                const dato = yield this.prodFirebase.doc(id).get();
                const producto = dato.data();
                if (producto) {
                    prod.push(Object.assign({ _id: dato.id }, producto));
                    return prod;
                }
                return prod;
            }
            else {
                const datos = yield this.prodFirebase.get();
                const productos = datos.docs;
                prod = productos.map((producto) => (Object.assign({ _id: producto.id }, producto.data())));
                return prod;
            }
        });
    }
    add(body) {
        return __awaiter(this, void 0, void 0, function* () {
            body.timestamp = moment_1.default().format('DD/MM/YYYY HH:mm:ss');
            const doc = this.prodFirebase.doc();
            return yield doc.create(body);
        });
    }
    update(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield this.get(id);
            if (producto) {
                yield this.prodFirebase.doc(id).update(body);
                const productoActualizado = yield this.get(id);
                return productoActualizado;
            }
            else {
                return producto;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const producto = yield this.get(id);
            if (producto.length) {
                yield this.prodFirebase.doc(id).delete();
            }
            else {
                throw new Error('El producto seleccionado no esta disponible');
            }
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield this.prodFirebase.get();
            const docs = productos.docs;
            const output = docs.map((document) => (Object.assign({ _id: document.id }, document.data())));
            const query = [];
            if (options.nombre)
                query.push((product) => product.title == options.title);
            if (options.codigo)
                query.push((product) => product.codigo == options.codigo);
            if (options.minPrecio)
                query.push((product) => product.precio >= options.minPrecio);
            if (options.maxPrecio)
                query.push((product) => product.price <= options.maxPrecio);
            if (options.minStock)
                query.push((product) => product.stock >= options.minStock);
            if (options.maxStock)
                query.push((product) => product.stock <= options.maxStock);
            return output.filter((prod) => query.every((x) => x(prod)));
        });
    }
}
exports.ProductosFirebaseDAO = ProductosFirebaseDAO;
//# sourceMappingURL=firebase.js.map