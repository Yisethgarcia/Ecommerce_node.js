import { client, main } from '../helpers/db.js';

export class Usersdata {
    constructor() {
        this.db = null;
        this.Users = null;
    }

    static connect = async()=> {
        this.db = await main();
        this.Users = this.db.collection('Users');

        const data = [
            { firstname: "Laura", identificationNumber: "1001", email: "laura.martinez@example.com", password: "Lm#2025" },
            { firstname: "Carlos", identificationNumber: "1002", email: "carlos.perez@example.com", password: "Cp@321" },
            { firstname: "Valentina", identificationNumber: "1003", email: "valen23@gmail.com", password: "Vt*456" },
            { firstname: "Andrés", identificationNumber: "1004", email: "andres_1989@hotmail.com", password: "A_1989!" },
            { firstname: "María", identificationNumber: "1005", email: "maria.rios@correo.com", password: "Mr$789" }
        ];

        try {
            await this.connect();
            let result = await this.Users.insertMany(data);
            console.log('Inserted Users');
            console.log(result);

        } catch ({ writeErrors, ...error }) {
            const {
                errInfo: { details: { schemaRulesNotSatisfied } }
            } = writeErrors[0].err;
            console.log(schemaRulesNotSatisfied);
        } finally {
            await client.close();
        }
    }
}
