import { main } from '../helpers/db.js';

export class CategoryService {
    #db;

    constructor() {
        this.#db = null;
    }

    async init() {
        try {
            this.#db = await main();
            console.log('Connected to DB (Categories)...');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async createCategoriesCollection() {
        try {
            if (!this.#db) {
                await this.init();
            }

            await this.#db.createCollection('Categories', {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["code", "name", "active"],
                        properties: {
                            code: {
                                bsonType: "string",
                                description: "Check the product code"
                            },
                            name: {
                                bsonType: "string",
                                description: "Check the product name"
                            },
                            active: {
                                bsonType: "bool",
                                description: "Indicates whether the item is active or not"
                            }
                        }
                    }
                }
            });

            console.log('Category schema created');
            await this.#createIndexes();
        } catch (error) {
            console.error('Error creating categories collection:', error);
            throw error;
        }
    }

//Indices
    async #createIndexes() {
        const categoriesCollection = this.#db.collection('Categories');

        await categoriesCollection.createIndex({ code: 1 }, { unique: true });
        await categoriesCollection.createIndex({ name: 1 });
        await categoriesCollection.createIndex({ active: 1 });

        console.log('Indexes for categories created');
    }
}
