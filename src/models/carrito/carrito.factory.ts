import {CarritoMemDAO} from './DAOs/memory'
// import {CarritoFirebaseDAO} from './DAOs/firebase'
import {CarritoFSDAO} from './DAOs/fs'
import {CarritoCompassDAO} from './DAOs/mongo'
import {CarritoMysqlDAO} from './DAOs/mySql'
import {CarritoSqliteDAO} from './DAOs/sqlLite'

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
        const filePath = path.resolve(__dirname, './DAOs/carrito.json');
        
        return new CarritoFSDAO(filePath);

      case TipoPersistencia.MongoCompass:
        console.log('RETORNANDO INSTANCIA CLASE MONGO COMPASS');
        return new CarritoCompassDAO();

        case TipoPersistencia.MYSQL:
          console.log('RETORNANDO INSTANCIA CLASE MY SQL');
          return new CarritoMysqlDAO();

          case TipoPersistencia.SQLITE3:
            console.log('RETORNANDO INSTANCIA CLASE SQLITE3');
            return new CarritoSqliteDAO();

            // case TipoPersistencia.Firebase:
            //   console.log('RETORNANDO INSTANCIA CLASE FIREBASE');
            //   return new CarritoFirebaseDAO();

      case TipoPersistencia.LocalMongo:
        console.log('RETORNANDO INSTANCIA CLASE MONGO LOCAL');
        return new CarritoCompassDAO(true);

      default:
        console.log('RETORNANDO INSTANCIA CLASE MEMORIA');
        return new CarritoMemDAO();
    }
  }
}
