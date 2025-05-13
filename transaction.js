import { client, main } from './helpers/db.js';

const db = await main();
const session = client.startSession(); 

try {
  const config = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' }
  };

  await session.withTransaction(async () => {
    const categories = db.collection('categories');
    const products = db.collection('products');

    //Inserta nueva categoría
    await categories.insertOne({
      code: 'new-cat-01',
      name: 'Tecnología wearable'
    }, { session });

    //Inserta producto asociado con la nueva categoría
    await products.insertOne({
      code: 'prod-999',
      name: 'Smartwatch Pro X',
      price: 249.99,
      category: 'new-cat-01'
    }, { session });

    console.log("Categoría y producto creados exitosamente en transacción");

  }, config);
}
catch({ errInfo, ...error}){
    console.log(error);
    const { details: {schemaRulesNotSatisfied}}= errInfo
    console.log(...schemaRulesNotSatisfied);
}
finally {
  if (session.transaction.isActive) await session.abortTransaction();
  await session.endSession();
  await client.close();
}
