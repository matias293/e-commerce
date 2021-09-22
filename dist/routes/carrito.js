"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const carrito_1 = require("../controllers/carrito");
const router = express_1.Router();
router.get('/listar', express_async_handler_1.default(carrito_1.carritoController.getCarritos));
router.get('/listar/:id', express_async_handler_1.default(carrito_1.carritoController.getCarritos));
router.post('/agregar/:id', express_async_handler_1.default(carrito_1.carritoController.addCarritoProduct));
router.delete('/borrar/:id', express_async_handler_1.default(carrito_1.carritoController.deleteCarritoProduct));
exports.default = router;
//# sourceMappingURL=carrito.js.map