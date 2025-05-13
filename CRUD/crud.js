class CRUD {
    #db;
    #collectionName;

    constructor(db, collectionName) {
        this.#db = db;
        this.#collectionName = collectionName;
    }
    async insert(data) {
        const result = await this.#db.collection(this.#collectionName).insertMany(data);
        console.log(`Documentos insertados en ${this.#collectionName}`);
        return result;
    }
    async update(filter, data) {
        const result = await this.#db.collection(this.#collectionName).updateOne(filter, { $set: data });
        console.log('Documentos actualizados');
        return result;
    }
    async delete(filter) {
        const result = await this.#db.collection(this.#collectionName).deleteOne(filter);
        console.log('Document deleted');
        return result;
    }
    async find(filter) {
        return await this.#db.collection(this.#collectionName).find(filter).toArray();
    }
}

export class Category extends CRUD {
    constructor(db) {
        super(db, 'categories');
    }
}

export class Product extends CRUD {
    constructor(db) {
        super(db, 'products');
    }
}

export class User extends CRUD {
    constructor(db) {
        super(db, 'users');
    }
}

export class sales extends CRUD{
    constructor(db){
        super(db, 'sales')
    }
}

export class paymentMethods extends CRUD{
    constructor(db){
        super(db, 'paymentMethods')
    }
}