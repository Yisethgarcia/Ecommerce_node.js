import { MongoClient } from 'mongodb';

export const client = new MongoClient( process.env.DBURL );

export const main = async ()=>{
  try {
    await client.connect();
    console.log('Connect...');
    return client.db(process.env.DBNAME);
  } catch (error) {
    console.log(error);
    throw error;
  }
}