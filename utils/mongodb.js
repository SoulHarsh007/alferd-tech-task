import {MongoClient} from 'mongodb';

let cached = global.mongo;
!cached ? (cached = global.mongo = {conn: null, promise: null}) : undefined;

/**
 * @function dbConnect
 * @author SoulHarsh007 <harshtheking@hotmail.com>
 * @copyright SoulHarsh007 2021
 * @since v1.0.0-Beta
 * @description Index page
 * @returns {Promise<import('mongodb').MongoClient>} Returns connected mongo client
 */
export async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }
  !cached.promise
    ? (cached.promise = MongoClient.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }).then(client => client))
    : undefined;
  cached.conn = await cached.promise;
  return cached.conn;
}
