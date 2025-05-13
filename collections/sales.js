import { main } from '../helpers/db.js';

export class SalesService {
    #db;

    constructor() {
        this.#db = null;
    }

    async init() {
        try {
            this.#db = await main();
            console.log('Connected to DB (Sales)...');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async createSalesCollection() {
        try {
            if (!this.#db) {
                await this.init();
            }

            await this.#db.createCollection('Sales', {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["date", "payment_method", "client", "seller"],
                        properties: {
                            date: {
                                bsonType: "date",
                                description: "Must be a date and is required"
                            },
                            payment_method: {
                                bsonType: "objectId",
                                description: "Must be an objectId and is required"
                            },
                            client: {
                                bsonType: "objectId",
                                description: "Must be an ObjectId and is required"
                            },
                            seller: {
                                bsonType: "objectId",
                                description: "Must be an ObjectId and is required"
                            },
                            details: {
                                bsonType: "array",
                                items: {
                                    bsonType: "object",
                                    required: ["product", "quantity", "price"],
                                    properties: {
                                        product: {
                                            bsonType: "objectId",
                                            description: "Must be an ObjectId and is required"
                                        },
                                        quantity: {
                                            bsonType: "int",
                                            description: "Must be an integer and is required"
                                        },
                                        price: {
                                            bsonType: "int",
                                            description: "Must be an integer and is required"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            console.log('Sales schema created');
            await this.#createIndexes();

        } catch (error) {
            console.error('Error creating sales collection:', error);
            throw error;
        }
    }

//Indices
    async #createIndexes() {
        const salesCollection = this.#db.collection('Sales');

        await salesCollection.createIndex({ date: -1 });       
        await salesCollection.createIndex({ client: 1 });      
        await salesCollection.createIndex({ reference: 1 }, { unique: true }); 

        console.log('Indexes for sales created');
    }
}
