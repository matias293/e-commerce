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
exports.carritoApi = void 0;
const carrito_factory_1 = require("../models/carrito/carrito.factory");
/**
 * Con esta variable elegimos el tipo de persistencia
 */
const tipo = carrito_factory_1.TipoPersistencia.Memoria;
class carAPI {
    constructor() {
        this.carritos = carrito_factory_1.NoticiasFactoryDAO.get(tipo);
    }
    getCarritos(id = undefined) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id)
                return this.carritos.get(id);
            return this.carritos.get();
        });
    }
    addProductCarrito(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = yield this.carritos.add(id);
            return newProduct;
        });
    }
    deleteProductCarrito(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.carritos.delete(id);
        });
    }
}
exports.carritoApi = new carAPI();
//# sourceMappingURL=carrito.js.map