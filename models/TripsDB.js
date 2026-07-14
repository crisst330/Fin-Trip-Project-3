import { MongoClient, ObjectId } from "mongodb";
import process from "node:process";

function TripsDB({
  dbName = "finTrip",
  collectionName = "trips",
  defaultURI = "mongodb://localhost:27017",
} = {}) {
  const me = {};
  const URI = process.env.MONGODB_URI || defaultURI;

  const connect = async () => {
    console.log("Connecting to MongoDB...", URI);
    const client = new MongoClient(URI);
    await client.connect();
    const trips = client.db(dbName).collection(collectionName);
    return { client, trips };
  };

  me.addItem = async (tripId, item) => {
    const { client, trips } = await connect();
    try {
      const result = await trips.updateOne(
        { _id: new ObjectId(tripId) },
        { $push: { items: item } },
      );
      return result;
    } finally {
      await client.close();
    }
  };

  me.updateItem = async (
    tripId,
    itemId,
    { category, title, cost, status, link, notes: itemNotes },
  ) => {
    const { client, trips } = await connect();
    try {
      const result = await trips.updateOne(
        { _id: new ObjectId(tripId), "items.itemId": itemId },
        {
          $set: {
            "items.$.category": category,
            "items.$.title": title,
            "items.$.cost": cost,
            "items.$.status": status,
            "items.$.link": link,
            "items.$.notes": itemNotes,
          },
        },
      );
      return result;
    } finally {
      await client.close();
    }
  };

  me.deleteItem = async (tripId, itemId) => {
    const { client, trips } = await connect();
    try {
      const result = await trips.updateOne(
        { _id: new ObjectId(tripId) },
        { $pull: { items: { itemId } } },
      );
      return result;
    } finally {
      await client.close();
    }
  };

  return me;
}

const tripsDB = TripsDB();
export default tripsDB;
