import { client, main } from '../helpers/db.js';
import { ObjectId } from 'mongodb';

export class Salesdata {
  constructor() {
      this.db = null;
      this.Sales = null;
  }

  static connect = async()=> {
      this.db = await main();
      this.Sales = this.db.collection('Sales');

      const data = [
            {
                reference: "SALE01",
                date: new Date("2025-05-01T10:15:00Z"),
                payment_method: new ObjectId(),
                client: new ObjectId(),
                seller: new ObjectId(),
                product: new ObjectId(),
                quantity: 2,
                price: 999.99
            },
            {
                reference: "SALE02",
                date: new Date("2025-05-01T10:15:00Z"),
                payment_method: new ObjectId(),
                client: new ObjectId(),
                seller: new ObjectId(),
                product: new ObjectId(),
                quantity: 1,
                price: 150.50
            },
            {
                reference: "SALE03",
                date: new Date("2025-05-02T14:40:00Z"),
                payment_method: new ObjectId(),
                client: new ObjectId(),
                seller: new ObjectId(),
                product: new ObjectId(),
                quantity: 1,
                price: 1999.99
            },
            {
                reference: "SALE04",
                date: new Date("2025-05-02T14:40:00Z"),
                payment_method: new ObjectId(),
                client: new ObjectId(),
                seller: new ObjectId(),
                product: new ObjectId(),
                quantity: 3,
                price: 499.90
            },
            {
                reference: "SALE05",
                date: new Date("2025-05-03T09:20:00Z"),
                payment_method: new ObjectId(),
                client: new ObjectId(),
                seller: new ObjectId(),
                product: new ObjectId(),
                quantity: 5,
                price: 120.00
            }
        ];
  
    try {
      let result = await this.Sales.insertMany(data);
      console.log('Inserted Sales');
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


