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
exports.ProductosCompassDAO = exports.productoModelo = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const productsSchema = new mongoose_1.default.Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    codigo: String,
    foto: String,
    stock: Number
});
exports.productoModelo = mongoose_1.default.model('producto', productsSchema);
class ProductosCompassDAO {
    constructor(local = false) {
        if (local)
            this.srv = `mongodb://localhost:27017/${process.env.MONGO_LOCAL_DBNAME}`;
        else
            this.srv = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@coder2daentrega.itkwg.mongodb.net/Shop`;
        mongoose_1.default.connect(this.srv);
        this.productos = mongoose_1.default.model('producto', productsSchema);
    }
    get(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let output = [];
            try {
                if (id) {
                    const document = yield this.productos.findById(id);
                    if (document)
                        output.push(document);
                }
                else {
                    output = yield this.productos.find();
                }
                return output;
            }
            catch (err) {
                return output;
            }
        });
    }
    add(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!data.nombre || !data.precio)
                throw new Error('invalid data');
            const newProduct = new this.productos(data);
            yield newProduct.save();
            return newProduct;
        });
    }
    update(id, newProductData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.productos.findByIdAndUpdate(id, newProductData);
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.productos.findByIdAndDelete(id);
        });
    }
    query(options) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = {};
            if (options.nombre)
                query.nombre = options.nombre;
            if (options.codigo)
                query.codigo = options.codigo;
            if (options.minPrecio && options.maxPrecio)
                query.precio = { $gte: options.minPrecio, $lte: options.maxPrecio };
            if (options.minStock && options.maxStock)
                query.stock = { $gte: options.minStock, $lte: options.maxStock };
            const productos = yield this.productos.find(query);
            return productos;
        });
    }
}
exports.ProductosCompassDAO = ProductosCompassDAO;
//# sourceMappingURL=mongo.js.map