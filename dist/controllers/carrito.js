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
exports.carritoController = void 0;
const carrito_1 = require("../apis/carrito");
class Carrito {
    getCarritos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            if (id) {
                const result = yield carrito_1.carritoApi.getCarritos(id);
                if (!result.length) {
                    return res.status(404).json({
                        data: 'No tiene productos en su carrito',
                    });
                }
                return res.json({
                    data: result,
                });
            }
            const carro = yield carrito_1.carritoApi.getCarritos();
            if (!carro.length) {
                return res.status(404).json({
                    data: 'No hay productos en el carrito',
                });
            }
            res.json({
                data: carro
            });
        });
    }
    addCarritoProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const newItem = yield carrito_1.carritoApi.addProductCarrito(id);
            res.json({
                msg: 'Producto agregado con exito',
                data: newItem,
            });
        });
    }
    deleteCarritoProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield carrito_1.carritoApi.deleteProductCarrito(id);
            res.json({
                msg: 'Producto borrado',
            });
        });
    }
}
exports.carritoController = new Carrito();
//# sourceMappingURL=carrito.js.map