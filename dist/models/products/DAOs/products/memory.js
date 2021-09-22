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
exports.ProductosMemDAO = void 0;
const uuid_1 = require("uuid");
class ProductosMemDAO {
    constructor() {
        this.productos = [];
        this.productos = [];
    }
    findIndex(id) {
        return this.productos.findIndex((aProduct) => aProduct._id == id);
    }
    find(id) {
        return this.productos.find((aProduct) => aProduct._id === id);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id) {
                return this.productos.filter((aProduct) => aProduct._id === id);
            }
            return this.productos;
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { nombre, precio, descripcion, codigo, foto, stock } = data;
            if (!nombre || !precio || !descripcion || !codigo || !stock || !foto)
                throw new Error('invalid data or empty data');
            const newItem = {
                _id: uuid_1.v4(),
                nombre,
                precio,
                descripcion,
                codigo,
                foto,
                stock,
                timestamp: Date.now()
            };
            this.productos.push(newItem);
            return newItem;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            const oldProduct = this.productos[index];
            const updatedProduct = Object.assign(Object.assign({}, oldProduct), newProductData);
            this.productos.splice(index, 1, updatedProduct);
            return updatedProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const index = this.findIndex(id);
            this.productos.splice(index, 1);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const productos = yield this.get();
            const query = [];
            if (options.nombre)
                query.push((aProduct) => aProduct.nombre == options.nombre);
            if (options.codigo)
                query.push((aProduct) => aProduct.codigo == options.codigo);
            if (options.minPrecio)
                query.push((aProduct) => aProduct.precio >= options.minPrecio);
            if (options.maxPrecio)
                query.push((aProduct) => aProduct.precio <= options.maxPrecio);
            if (options.minStock)
                query.push((aProduct) => aProduct.stock == options.minStock);
            if (options.maxStock)
                query.push((aProduct) => aProduct.stock == options.maxStock);
            return productos.filter((aProduct) => query.every((x) => x(aProduct)));
        });
    }
}
exports.ProductosMemDAO = ProductosMemDAO;
//# sourceMappingURL=memory.js.map