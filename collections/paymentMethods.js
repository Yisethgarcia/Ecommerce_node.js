import { main } from '../helpers/db.js';

export class PaymentMethodService {
    #db;

    constructor() {
        this.#db = null;
    }

    async init() {
        try {
            this.#db = await main();
            console.log('Connected to DB (PaymentMethods)...');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async createPaymentMethodsCollection() {
        try {
            if (!this.#db) {
                await this.init();
            }

            await this.#db.createCollection('PaymentMethods', {
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
                                description: "Describes the form of payment"
                            },
                            active: {
                                bsonType: "bool",
                                description: "Indicates whether the item is active or not"
                            }
                        }
                    }
                }
            });

            console.log('PaymentMethods schema created');
            await this.#createIndexes();

        } catch (error) {
            console.error('Error creating paymentMethods collection:', error);
            throw error;
        }
    }

//Indices
    async #createIndexes() {
        const collection = this.#db.collection('PaymentMethods');

        await collection.createIndex({ active: 1 });

        console.log('Indexes for paymentMethods created');
    }
}
