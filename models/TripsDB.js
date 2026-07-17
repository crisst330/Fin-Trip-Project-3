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

  me.getTrips = async (ownerId) => {
    const { client, trips } = await connect();

    try {
      return await trips.find({ ownerId: new ObjectId(ownerId) }).toArray();
    } catch (error) {
      console.error("Error finding trips:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  me.getTripById = async (tripId, ownerId) => {
    if (!ObjectId.isValid(tripId) || !ObjectId.isValid(ownerId)) {
      return null;
    }

    const { client, trips } = await connect();

    try {
      return await trips.findOne({
        _id: new ObjectId(tripId),
        ownerId: new ObjectId(ownerId),
      });
    } catch (error) {
      console.error("Error finding trip by ID:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  // This method stores the following: {_id: ObjectId("..."), ownerId: ObjectId("logged-in-user-id"), name:, etc}
  // aka, the database record
  me.createTrip = async ({
    ownerId,
    name,
    destination,
    startDate,
    endDate,
    travelers,
    budgetCap,
  }) => {
    const { client, trips } = await connect();

    try {
      const trip = {
        ownerId: new ObjectId(ownerId),
        name,
        destination,
        startDate,
        endDate,
        travelers: Number(travelers),
        budgetCap: Number(budgetCap),
        items: [],
      };

      const result = await trips.insertOne(trip);

      return {
        ...trip,
        _id: result.insertedId,
      };
    } catch (error) {
      console.error("Error creating trip:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  me.updateTrip = async (tripId, ownerId, updates) => {
    if (!ObjectId.isValid(tripId) || !ObjectId.isValid(ownerId)) {
      return null;
    }

    const { client, trips } = await connect();

    try {
      const updatedFields = {
        name: updates.name,
        destination: updates.destination,
        startDate: updates.startDate,
        endDate: updates.endDate,
        travelers: Number(updates.travelers),
        budgetCap: Number(updates.budgetCap),
      };

      return await trips.findOneAndUpdate(
        {
          _id: new ObjectId(tripId),
          ownerId: new ObjectId(ownerId),
        },
        {
          $set: updatedFields,
        },
        {
          returnDocument: "after",
        },
      );
    } catch (error) {
      console.error("Error updating trip:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  me.deleteTrip = async (tripId, ownerId) => {
    if (!ObjectId.isValid(tripId) || !ObjectId.isValid(ownerId)) {
      return false;
    }

    const { client, trips } = await connect();

    try {
      const result = await trips.deleteOne({
        _id: new ObjectId(tripId),
        ownerId: new ObjectId(ownerId),
      });

      return result.deletedCount === 1;
    } catch (error) {
      console.error("Error deleting trip:", error);
      throw error;
    } finally {
      await client.close();
    }
  };

  me.addItem = async (tripId, item) => {
    const { client, trips } = await connect();

    try {
      return await trips.updateOne(
        { 
          _id: new ObjectId(tripId),
          ownerId: new ObjectId(ownerId),
        },
        { 
          $push: { 
            items: item } 
        },
      );
    } finally {
      await client.close();
    }
  };

  me.updateItem = async (
    tripId,
    ownerId,
    itemId,
    { category, title, cost, status, link, notes: itemNotes },
  ) => {
    const { client, trips } = await connect();
    try {
      return await trips.updateOne(
        { 
          _id: new ObjectId(tripId),
          ownerId: new ObjectId(ownerId), 
          "items.itemId": itemId 
        },
        {
          $set: {
            "items.$.category": category,
            "items.$.title": title,
            "items.$.cost": Number(cost),
            "items.$.status": status,
            "items.$.link": link,
            "items.$.notes": itemNotes,
          },
        },
      );
    } finally {
      await client.close();
    }
  };

  me.deleteItem = async (tripId, itemId) => {
    const { client, trips } = await connect();

    try {
      return await trips.updateOne(
        { 
          _id: new ObjectId(tripId),
          ownerId: new ObjectId(ownerId), 
        },
        { 
          $pull: { 
            items: { 
              itemId,
            }, 
          }, 
        },
      );
    } finally {
      await client.close();
    }
  };

  return me;
}

const tripsDB = TripsDB();
export default tripsDB;
