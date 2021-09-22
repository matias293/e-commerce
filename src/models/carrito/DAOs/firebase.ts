import moment from 'moment'
import admin from 'firebase-admin'

import {productsAPI} from '../../../apis/productos'
import {CarritoI,
    ProductC,
    ProductI} from '../carrito.interfaces'
import serviceAccount  from '../../../../coderFirebase.json'

export class CarritoFirebaseDAO{
    public prodFirebase;
    public db
    public carritoFirebase
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
          this.db = admin.firestore();
          this.carritoFirebase = this.db.collection('carrito');
          this.prodFirebase = this.db.collection('carrito');
    }
    async get(id?: string) {
        let prod:ProductC[] = []
     if(id){
         const prodDAta = await this.carritoFirebase.doc(id).get()
         const product = prodDAta.data()
         if(product){
            prod.push({_id:prodDAta.id, ...product})
            return prod
         }
         return prod
        }else{
            const prodDocs = await this.carritoFirebase.get();
            const productos = prodDocs.docs;
            const output = productos.map((prod) => ({
				_id: prod.id,
				...prod.data(),
			}));
			return output;
        }    
     }   

     async add(id: string){
        const product = await productsAPI.getProducts(id);
        if(product.length == 0){
            throw new Error('No existe producto con esa id')
        }
        const doc = this.prodFirebase.doc(id);
        await doc.create(product[0])
        return product
     }

     async delete(id: string){
        const productoParaEliminar = await this.get(id);
        if(productoParaEliminar.length == 0){
            throw new Error('No existe producto con esa id')
        }
        else{
            await this.carritoFirebase.doc(id).delete()
        }
     }


}

