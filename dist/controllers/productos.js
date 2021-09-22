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
exports.productsController = void 0;
const productos_1 = require("../apis/productos");
class Producto {
    checkAddProducts(req, res, next) {
        const { nombre, precio, stock, } = req.body;
        if (!nombre || !precio || typeof nombre !== 'string' || !stock || isNaN(precio)) {
            return res.status(400).json({
                msg: 'Campos del body invalidos',
            });
        }
        next();
    }
    checkProductExists(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const products = yield productos_1.productsAPI.getProducts();
            if (products.length === 0) {
                return res.status(404).json({
                    data: 'No hay productos disponibles',
                });
            }
            const producto = yield productos_1.productsAPI.getProducts(id);
            if (producto.length === 0) {
                return res.status(404).json({
                    msg: 'Producto no encontrado',
                });
            }
            next();
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const { nombre, codigo, minPrecio, maxPrecio, minStock, maxStock } = req.query;
            if (id) {
                const result = yield productos_1.productsAPI.getProducts(id);
                if (!result.length) {
                    return res.status(404).json({
                        data: 'objeto no encontrado',
                    });
                }
                return res.json({
                    data: result,
                });
            }
            const query = {};
            if (nombre)
                query.nombre = nombre.toString();
            if (codigo)
                query.codigo = codigo.toString();
            if (minPrecio)
                query.minPrecio = Number(minPrecio);
            if (maxPrecio)
                query.maxPrecio = Number(maxPrecio);
            if (minStock)
                query.minStock = Number(minStock);
            if (maxStock)
                query.maxStock = Number(maxStock);
            if (Object.keys(query).length) {
                return res.json({
                    data: yield productos_1.productsAPI.query(query),
                });
            }
            res.json({
                data: yield productos_1.productsAPI.getProducts()
            });
        });
    }
    addProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const newItem = yield productos_1.productsAPI.addProduct(req.body);
            res.json({
                msg: 'Producto agregado con exito',
                data: newItem,
            });
        });
    }
    updateProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const updatedItem = yield productos_1.productsAPI.updateProduct(id, req.body);
            res.json({
                msg: 'Actualizando producto',
                data: updatedItem,
            });
        });
    }
    deleteProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield productos_1.productsAPI.deleteProduct(id);
            res.json({
                msg: 'Producto borrado',
            });
        });
    }
}
exports.productsController = new Producto();
//# sourceMappingURL=productos.js.map