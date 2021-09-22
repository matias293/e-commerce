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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoMemDAO = void 0;
const uuid_1 = require("uuid");
const productos_1 = require("../../../apis/productos");
class CarritoMemDAO {
    constructor() {
        this.carrito = [];
        this.productos = [];
        this.carrito = [];
        this.productos = [];
        this.actualizado();
    }
    actualizado() {
        this.carrito.push({
            id: uuid_1.v4(),
            timestamp: Date.now(),
            products: this.productos
        });
    }
    findIndex(id) {
        return this.carrito.findIndex((aProduct) => aProduct._id == id);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.productos.filter((aProduct) => aProduct._id === id);
            }
            return this.productos;
        });
    }
    add(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const allProducts = yield productos_1.productsAPI.getProducts();
            const producto = allProducts.find((prod) => prod._id == id);
            if (!producto) {
                throw new Error('El producto no existe');
            }
            this.productos.push(producto);
            return producto;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            this.carrito.splice(index, 1);
        });
    }
}
exports.CarritoMemDAO = CarritoMemDAO;
//# sourceMappingURL=memory.js.map