import { client, main } from './helpers/db.js';

const db = await main();
const products = db.collection('products');

const pipeline = [
  {
    $lookup: {
      from: 'categories',
      localField: 'category', //products
      foreignField: 'code', //categories
      as: 'categoryInfo'
    }
  },
  { $unwind: '$categoryInfo' },
  { $project: { _id: 0, 'categoryInfo._id': 0 } },
  {
    $group: {
      _id: '$categoryInfo.code',
      categoria: { $first: '$categoryInfo.name' },
      totalProductos: { $sum: 1 },
      precioPromedio: { $avg: '$price' },
      precioMinimo: { $min: '$price' },
      precioMaximo: { $max: '$price' },
      primerProducto: { $first: '$name' },
      ultimoProducto: { $last: '$name' },
      codigosProductos: { $push: '$code' }
    }
  },

  //Filtros
  { $match: { precioPromedio: { $gte: 100 } } },
  { $sort: { precioPromedio: -1 } },
  { $limit: 5 }
];

const result = await products.aggregate(pipeline).toArray();
console.log(JSON.stringify(result, null, 2));
await client.close();
