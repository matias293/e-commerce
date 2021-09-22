import { ProductosMemDAO } from './DAOs/products/memory';
import { ProductosFSDAO } from './DAOs/products/fs';
import { ProductosCompassDAO } from './DAOs/products/mongo';
import {ProductosFirebaseDAO} from './DAOs/products/firebase'
import {ProductosMysqlDAO} from './DAOs/products/mySql'
import {ProductosSqliteDAO} from './DAOs/products/sqlLite'


import path from 'path';
export enum TipoPersistencia {
  Memoria = 'MEM',
  FileSystem = 'FS',
  MYSQL = 'MYSQL',
  SQLITE3 = 'SQLITE3',
  LocalMongo = 'LOCAL-MONGO',
  MongoCompass = 'MONGO-COMPASS',
  Firebase = 'FIREBASE',
}

export class NoticiasFactoryDAO {
  static get(tipo: TipoPersistencia) {
    switch (tipo) {

      case TipoPersistencia.FileSystem:
        console.log('RETORNANDO INSTANCIA CLASE FS');
        const filePath = path.resolve(__dirname, './DAOs/products.json');
        return new ProductosFSDAO(filePath);

      case TipoPersistencia.MongoCompass:
        console.log('RETORNANDO INSTANCIA CLASE MONGO COMPASS');
        return new ProductosCompassDAO();

        case TipoPersistencia.MYSQL:
          console.log('RETORNANDO INSTANCIA CLASE MY SQL');
          return new ProductosMysqlDAO();

          case TipoPersistencia.SQLITE3:
            console.log('RETORNANDO INSTANCIA CLASE SQLITE3');
            return new ProductosSqliteDAO();

            case TipoPersistencia.Firebase:
              console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
              return new ProductosFirebaseDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new ProductosCompassDAO(true);

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new ProductosMemDAO();
    }
  }
}
