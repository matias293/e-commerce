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
exports.ProductosFSDAO = void 0;
const uuid_1 = require("uuid");
const fs_1 = __importDefault(require("fs"));
class ProductosFSDAO {
    constructor(fileName) {
        this.productos = [];
        this.nombreArchivo = fileName;
        this.productos = [];
        this.leer(this.nombreArchivo);
    }
    leer(archivo) {
        return __awaiter(this, void 0, void 0, function* () {
            let fileExists = fs_1.default.existsSync(archivo);
            if (fileExists) {
                this.productos = JSON.parse(yield fs_1.default.promises.readFile(archivo, 'utf-8'));
                return;
            }
            else {
                this.guardar();
            }
            // this.productos = JSON.parse(await fs.promises.readFile(archivo, 'utf-8'));
        });
    }
    guardar() {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs_1.default.promises.writeFile(this.nombreArchivo, JSON.stringify(this.productos, null, '\t'));
        });
    }
    findIndex(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.nombreArchivo);
            return this.productos.findIndex((aProduct) => aProduct._id == id);
        });
    }
    find(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.nombreArchivo);
            return this.productos.find((aProduct) => aProduct._id === id);
        });
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.nombreArchivo);
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
            yield this.leer(this.nombreArchivo);
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
            yield this.guardar();
            return newItem;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.nombreArchivo);
            const index = yield this.findIndex(id);
            const oldProduct = this.productos[index];
            const updatedProduct = Object.assign(Object.assign({}, oldProduct), newProductData);
            this.productos.splice(index, 1, updatedProduct);
            yield this.guardar();
            return updatedProduct;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.nombreArchivo);
            const index = yield this.findIndex(id);
            this.productos.splice(index, 1);
            yield this.guardar();
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.leer(this.nombreArchivo);
            const query = [];
            if (options.nombre)
                query.push((aProduct) => aProduct.nombre == options.nombre);
            if (options.precio)
                query.push((aProduct) => aProduct.precio == options.precio);
            return this.productos.filter((aProduct) => query.every((x) => x(aProduct)));
        });
    }
}
exports.ProductosFSDAO = ProductosFSDAO;
//# sourceMappingURL=fs.js.map