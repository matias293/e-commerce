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
exports.CarritoFSDAO = void 0;
const uuid_1 = require("uuid");
const memory_1 = require("../../../models/products/DAOs/products/memory");
class CarritoFSDAO {
    constructor(filePath) {
        this.carrito = [];
        this.carritoOld = [];
        this.productos = [];
        this.actualizado = () => {
            const data = this.readFile();
            if (data) {
                const productos = JSON.parse(data);
                this.carritoOld = productos;
                this.carrito.push({ id: uuid_1.v4(), timestamp: Date.now(), products: this.productos });
            }
            else {
                this.carrito.push({ id: uuid_1.v4(), timestamp: Date.now(), products: this.productos });
            }
        };
        this.guardar = () => {
            if (this.carritoOld.length === 0) {
                this.writeFile(this.carrito);
            }
            else {
                const carro = this.carritoOld.concat(this.carrito);
                this.writeFile(carro);
            }
        };
        this.delete = (id) => {
            const productos = this.productos;
            const productosNuevos = productos.filter(prod => prod._id !== id);
            this.productos = productosNuevos;
            this.carrito[0].products = this.productos;
            this.guardar();
        };
        this.add = (id) => __awaiter(this, void 0, void 0, function* () {
            const Producto = new memory_1.ProductosMemDAO();
            const productos = yield Producto.get();
            const producto = productos.find(prod => prod._id == id);
            if (!producto) {
                throw new Error('El producto no existe');
            }
            else {
                this.productos.push(producto);
                this.guardar();
                return producto;
            }
        });
        this.getCarritos = (id) => {
            const carros = this.leer();
            const carrito = carros.find(prod => prod.id === id);
            return carrito;
        };
        this.leer = () => {
            if (this.carritoOld.length === 0) {
                return this.carrito;
            }
            else {
                return this.carritoOld.concat(this.carrito);
            }
        };
        this.writeFile = (carro) => {
            try {
                return fs.writeFileSync(this.fileName, carro, null, '\t');
            }
            catch (error) {
                console.log('No se pudo escribir el archivo ', error);
            }
        };
        this.readFile = () => {
            try {
                return fs.readFileSync(this.fileName, 'utf-8');
            }
            catch (error) {
                console.log('No se pudo leer el archivo ', error);
            }
        };
        this.fileName = filePath;
        this.carrito = [];
        this.carritoOld = [];
        this.productos = [];
        this.actualizado();
    }
} // 
exports.CarritoFSDAO = CarritoFSDAO;
//# sourceMappingURL=fs.js.map