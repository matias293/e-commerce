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
exports.ProductosAtlasDAO = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("../../../config"));
const productsSchema = new mongoose_1.default.Schema({
    nombre: String,
    precio: Number,
});
class ProductosAtlasDAO {
    constructor(local = false) {
        if (local)
            this.srv = `mongodb://localhost:27017/${config_1.default.MONGO_LOCAL_DBNAME}`;
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
            if (options.precio)
                query.precio = options.precio;
            return this.productos.find(query);
        });
    }
}
exports.ProductosAtlasDAO = ProductosAtlasDAO;
//# sourceMappingURL=mongo.js.map