"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const venv = {
    PORT: process.env.PORT || 8080,
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'user',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'pasw',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'clusterUrl',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'dbName',
    MONGO_LOCAL_DBNAME: process.env.MONGO_LOCAL_DBNAME || 'dbNameLocal',
};
exports.default = venv;
//# sourceMappingURL=index.js.map