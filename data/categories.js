import { client, main } from '../helpers/db.js';

export class Categorydata {
    constructor() {
        this.db = null;
        this.categories = null;
    }

    static connect = async()=> {
        this.db = await main();
        this.categories = this.db.collection('categories');

            const data = [
                { code: "GAMR", name: "Gaming y Consolas", active: true },
                { code: "SMRT", name: "Smartphones y Accesorios", active: true },
                { code: "FASH", name: "Moda y Accesorios", active: true },
                { code: "FURN", name: "Muebles", active: false },
                { code: "GRDN", name: "Jardín y Exteriores", active: true },
                { code: "KIDS", name: "Niños y Bebés", active: true },
                { code: "SUBS", name: "Suscripciones y Servicios", active: false }        
            ];
    
            try {
                let result = await this.categories.insertMany(data);
                console.log('Inserted categories');
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