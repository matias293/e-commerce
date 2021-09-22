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
exports.CarritoFirebaseDAO = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const productos_1 = require("../../../apis/productos");
const coderFirebase_json_1 = __importDefault(require("../../../../coderFirebase.json"));
class CarritoFirebaseDAO {
    constructor() {
        firebase_admin_1.default.initializeApp({
            credential: firebase_admin_1.default.credential.cert(coderFirebase_json_1.default)
        });
        this.db = firebase_admin_1.default.firestore();
        this.carritoFirebase = this.db.collection('carrito');
        this.prodFirebase = this.db.collection('carrito');
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let prod = [];
            if (id) {
                const prodDAta = yield this.carritoFirebase.doc(id).get();
                const product = prodDAta.data();
                if (product) {
                    prod.push(Object.assign({ _id: prodDAta.id }, product));
                    return prod;
                }
                return prod;
            }
            else {
                const prodDocs = yield this.carritoFirebase.get();
                const productos = prodDocs.docs;
                const output = productos.map((prod) => (Object.assign({ _id: prod.id }, prod.data())));
                return output;
            }
        });
    }
    add(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield productos_1.productsAPI.getProducts(id);
            if (product.length == 0) {
                throw new Error('No existe producto con esa id');
            }
            const doc = this.prodFirebase.doc(id);
            yield doc.create(product[0]);
            return product;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const productoParaEliminar = yield this.get(id);
            if (productoParaEliminar.length == 0) {
                throw new Error('No existe producto con esa id');
            }
            else {
                yield this.carritoFirebase.doc(id).delete();
            }
        });
    }
}
exports.CarritoFirebaseDAO = CarritoFirebaseDAO;
//# sourceMappingURL=firebase.js.map