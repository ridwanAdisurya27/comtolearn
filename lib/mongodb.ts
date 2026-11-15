// 


import { MongoClient } from "mongodb";

const globalForMongo = globalThis as unknown as { _mongoClient?: MongoClient };

const client =
  globalForMongo._mongoClient ?? new MongoClient(process.env.MONGODB_URI!);

if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}
// Pastikan connect dipanggil sebelum digunakan
const clientPromise: Promise<MongoClient> = client.connect();

export { client, clientPromise };
export const db = client.db();