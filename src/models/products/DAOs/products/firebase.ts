import moment from 'moment'
import admin from 'firebase-admin'

import serviceAccount  from '../../../../../coderFirebase.json'





export class ProductosFirebaseDAO{
    public prodFirebase;
    public db
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
          });
          this.db = admin.firestore();
          this.prodFirebase = this.db.collection('productos');
    }

    async get(id?: string): Promise<ProductI[]> {
        let prod= []
        if(id){
            const dato = await this.prodFirebase.doc(id).get();
            const producto = dato.data();
            if(producto){
               prod.push({_id:dato.id,...producto})
              return  prod
            }
            return prod
        } else {
            const datos = await this.prodFirebase.get()
            const productos = datos.docs;
            prod = productos.map((producto) => ({
                _id: producto.id,
                ...producto.data()
            }))
            return prod

        }
    }

    async add(body: newProductI): Promise<FirebaseFirestore.WriteResult> {
       body.timestamp = moment().format('DD/MM/YYYY HH:mm:ss');
       const doc = this.prodFirebase.doc();
		return await doc.create(body);
    }

    async update(id: string, body: newProductI): Promise<ProductI[]> {
        const producto = await this.get(id);
        if(producto){
            await this.prodFirebase.doc(id).update(body);
            const productoActualizado = await this.get(id);
            return productoActualizado ;
        }
        else{
            return producto
        }
    }

    async delete(id: string): Promise<void> {
        const producto = await this.get(id);
        if (producto.length) {
			await this.prodFirebase.doc(id).delete();
			
		}
		else{
            throw new Error('El producto seleccionado no esta disponible')
        }
    }

    async query(options: ProductQuery): Promise<Products[]> {
        const productos = await this.prodFirebase.get();
		const docs = productos.docs;
		const output = docs.map((document) => ({
			_id: document.id,
			...document.data(),
		}));
        type Conditions = (Product: Products) => boolean;

        const query: Conditions[] = [];

		if (options.nombre)
			query.push((product: Products) => product.title == options.title);

		
		if (options.codigo)
			query.push((product: Products) => product.codigo == options.codigo);

		if (options.minPrecio)
			query.push((product: Products) => product.precio >= options.minPrecio);

		if (options.maxPrecio)
			query.push((product: Products) => product.price <= options.maxPrecio);

		if (options.minStock)
			query.push((product: Products) => product.stock >= options.minStock);

		if (options.maxStock)
			query.push((product: Products) => product.stock <= options.maxStock);

		return output.filter((prod) => query.every((x) => x(prod)));
    }
}