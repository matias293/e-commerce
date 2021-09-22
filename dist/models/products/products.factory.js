"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoticiasFactoryDAO = exports.TipoPersistencia = void 0;
const memory_1 = require("./DAOs/products/memory");
const fs_1 = require("./DAOs/products/fs");
const mongo_1 = require("./DAOs/products/mongo");
const firebase_1 = require("./DAOs/products/firebase");
const mySql_1 = require("./DAOs/products/mySql");
const sqlLite_1 = require("./DAOs/products/sqlLite");
const path_1 = __importDefault(require("path"));
var TipoPersistencia;
(function (TipoPersistencia) {
    TipoPersistencia["Memoria"] = "MEM";
    TipoPersistencia["FileSystem"] = "FS";
    TipoPersistencia["MYSQL"] = "MYSQL";
    TipoPersistencia["SQLITE3"] = "SQLITE3";
    TipoPersistencia["LocalMongo"] = "LOCAL-MONGO";
    TipoPersistencia["MongoCompass"] = "MONGO-COMPASS";
    TipoPersistencia["Firebase"] = "FIREBASE";
})(TipoPersistencia = exports.TipoPersistencia || (exports.TipoPersistencia = {}));
class NoticiasFactoryDAO {
    static get(tipo) {
        switch (tipo) {
            case TipoPersistencia.FileSystem:
                console.log('RETORNANDO INSTANCIA CLASE FS');
                const filePath = path_1.default.resolve(__dirname, './DAOs/products.json');
                return new fs_1.ProductosFSDAO(filePath);
            case TipoPersistencia.MongoCompass:
                console.log('RETORNANDO INSTANCIA CLASE MONGO COMPASS');
                return new mongo_1.ProductosCompassDAO();
            case TipoPersistencia.MYSQL:
                console.log('RETORNANDO INSTANCIA CLASE MY SQL');
                return new mySql_1.ProductosMysqlDAO();
            case TipoPersistencia.SQLITE3:
                console.log('RETORNANDO INSTANCIA CLASE SQLITE3');
                return new sqlLite_1.ProductosSqliteDAO();
            case TipoPersistencia.Firebase:
                console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
                return new firebase_1.ProductosFirebaseDAO();
            case TipoPersistencia.LocalMongo:
                console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
                return new mongo_1.ProductosCompassDAO(true);
            default:
                console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
                return new memory_1.ProductosMemDAO();
        }
    }
}
exports.NoticiasFactoryDAO = NoticiasFactoryDAO;
//# sourceMappingURL=products.factory.js.map