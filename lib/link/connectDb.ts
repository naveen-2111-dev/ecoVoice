import { MongoClient } from "mongodb";

const URI = process.env.NEXT_PUBLIC_MONGODB_URI;
const options = {}

if (!URI) {
    throw new Error("Please define the NEXT_PUBLIC_MONGODB_URI environment variable inside .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
    var _mongoClientPromise: Promise<MongoClient>;
}

client = new MongoClient(URI, options);
clientPromise = client.connect();

export default clientPromise;