import { main } from '../helpers/db.js';

export class ProductService {
    #db;

    constructor() {
        this.#db = null;
    }

    async init() {
        try {
            this.#db = await main();
            console.log('Connected to DB (Products)...');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async createProductsCollection() {
        try {
            if (!this.#db) {
                await this.init();
            }

            await this.#db.createCollection('Products', {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["code", "name", "image", "price", "active"],
                        properties: {
                            code: {
                                bsonType: "string",
                                description: "Write the product code"
                            },
                            name: {
                                bsonType: "string",
                                description: "Description name"
                            },
                            image: {
                                bsonType: "string",
                                pattern: "^https?:\\/\\/(.*\\.(jpg|jpeg|png|gif|bmp|webp))$",
                                description: "Upload the product image"
                            },
                            price: {
                                bsonType: "int",
                                description: "Enter the price of the product"
                            },
                            active: {
                                bsonType: "bool",
                                description: "Indicates whether the item is active or not"
                            },
                            categories: {
                                bsonType: "objectId"
                            }
                        }
                    }
                }
            });

            console.log('Products schema created');
            await this.#createIndexes();

        } catch (error) {
            console.error('Error creating products collection:', error);
            throw error;
        }
    }

//Indices
    async #createIndexes() {
        const productsCollection = this.#db.collection('Products');

        await productsCollection.createIndex({ code: 1 }, { unique: true });
        await productsCollection.createIndex({ categories: 1 });
        await productsCollection.createIndex({ stock: 1 });

        console.log('Indexes for products created');
    }
}
