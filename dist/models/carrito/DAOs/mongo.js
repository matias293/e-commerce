"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarritoCompassDAO = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const moment_1 = __importDefault(require("moment"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongo_1 = require("../../products/DAOs/products/mongo");
const carritoSchema = new mongoose_1.default.Schema({
    timestamp: { type: String, default: moment_1.default().format('DD/MM/YYYY HH:mm:ss') },
    products: [
        {
            productId: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'Product',
            }
        }
    ]
});
carritoSchema.methods.toJSON = function () {
    const _a = this.toObject(), { __v } = _a, data = __rest(_a, ["__v"]);
    return data;
};
class CarritoCompassDAO {
    constructor(local = false) {
        this.actualizado = () => __awaiter(this, void 0, void 0, function* () {
            const newCarrito = new this.carrito();
            yield newCarrito.save();
            this.carro = newCarrito;
            return newCarrito;
        });
        this.add = (id) => __awaiter(this, void 0, void 0, function* () {
            const productoExiste = yield this.productos.findById(id);
            if (productoExiste) {
                this.carro.products.push(productoExiste);
                yield this.carro.save();
            }
            else {
                throw new Error('No existe producto con ese id');
            }
        });
        this.get = (id) => __awaiter(this, void 0, void 0, function* () {
            if (id) {
                const carro = yield this.carrito.findById(id);
                return carro.products;
            }
            else {
                const carros = yield this.carrito.find();
                return carros;
            }
        });
        this.delete = (id) => __awaiter(this, void 0, void 0, function* () {
            console.log(this.carro.products);
            console.log(this.carro);
            console;
            const nuevoArray = this.carro.products.filter(prod => {
                console.log(prod._id.str);
                prod._id !== id;
            });
            console.log(nuevoArray);
        });
        if (local)
            this.srv = `mongodb://localhost:27017/${process.env.MONGO_LOCAL_DBNAME}`;
        else
            this.srv = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@coder2daentrega.itkwg.mongodb.net/Shop`;
        mongoose_1.default.connect(this.srv);
        this.carrito = mongoose_1.default.model('carrito', carritoSchema);
        this.carro;
        this.productos = mongo_1.productoModelo;
        this.actualizado();
    }
}
exports.CarritoCompassDAO = CarritoCompassDAO;
//# sourceMappingURL=mongo.js.map