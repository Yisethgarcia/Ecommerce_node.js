import { client, main } from '../helpers/db.js';

export class PaymentMethodata {
    constructor() {
        this.db = null;
        this.PaymentMethods = null;
    }

    static connect = async()=> {
        this.db = await main();
        this.PaymentMethods = this.db.collection('PaymentMethods');
        const data = [
            { code: "01", name: "Cash", active: true },
            { code: "02", name: "Card", active: true },
            { code: "03", name: "Transfer", active: true }
        ];

        try {
            let result = await this.PaymentMethods.insertMany(data);
            console.log('Inserted PaymentMethods');
            console.log(result);
            
        }catch ({writeErrors, ...error}) {
            const { 
                errInfo: {details:{schemaRulesNotSatisfied}}
            } = writeErrors[0].err;
            console.log(schemaRulesNotSatisfied);
        } finally {
            await client.close();
        }
    }

}

