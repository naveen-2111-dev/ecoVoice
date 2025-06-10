import { CollectionName, COLLECTIONS } from "../types";
import client from "./connectDb";

export default async function getCollection(name: CollectionName) {
    const db = (await client).db("voiceOut");

    if (!(name in COLLECTIONS)) {
        throw new Error(`Invalid collection name: ${name}`);
    }

    return db.collection(COLLECTIONS[name]);
}