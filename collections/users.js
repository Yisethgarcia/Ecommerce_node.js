import { main } from '../helpers/db.js';

export class UserService {
    #db;

    constructor() {
        this.#db = null;
    }

    async init() {
        try {
            this.#db = await main();
            console.log('Connected to DB (Users)...');
        } catch (error) {
            console.error('Database connection error:', error);
            throw error;
        }
    }

    async createUsersCollection() {
        try {
            if (!this.#db) {
                await this.init();
            }

            await this.#db.createCollection('Users', {
                validator: {
                    $jsonSchema: {
                        bsonType: "object",
                        required: ["firstname", "identificationNumber", "email", "password"],
                        properties: {
                            firstname: {
                                bsonType: "string",
                                description: "Description name"
                            },
                            identificationType: {
                                bsonType: "string",
                                enum: ["CC", "CE", "TI", "NIT"],
                                description: "Enter the type of identification"
                            },
                            identificationNumber: {
                                bsonType: "string",
                                description: "Enter the identification number"
                            },
                            email: {
                                bsonType: "string",
                                pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                                description: "Enter a valid email address"
                            },
                            password: {
                                bsonType: "string",
                                pattern: "^(?=.[a-z])(?=.[A-Z])(?=.\\d)(?=.[@$!%?&])[A-Za-z\\d@$!%?&]{8,}$",
                                description: "Enter a valid password"
                            }
                        }
                    }
                }
            });

            console.log('Users schema created');
            await this.#createIndexes();

        } catch (error) {
            console.error('Error creating users collection:', error);
            throw error;
        }
    }

//Indices
    async #createIndexes() {
        const usersCollection = this.#db.collection('Users');

        await usersCollection.createIndex({ identificationNumber: 1 }, { unique: true });
        await usersCollection.createIndex({ active: 1 });

        console.log('Indexes for users created');
    }
}
