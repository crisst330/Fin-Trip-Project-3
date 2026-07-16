import { MongoClient, ObjectId } from "mongodb";
import process from "process";

// Database configuration
function UsersDB({
  dbName = "finTrip",
  collectionName = "users",
  defaultURI = "mongodb://localhost:27017",
} = {}) {
  const me = {};
  const URI = process.env.MONGODB_URI || defaultURI;

  // Connection function
  const connect = async () => {
    console.log("Connecting to MongoDB at", URI);

    const client = new MongoClient(URI);
    await client.connect();

    const users = client.db(dbName).collection(collectionName);

    // Returns both the collection & the client
    return { client, users };
  };

  // 1st Authentication function
  // Creates a user document resembling: { _id:, name:, email:, passwordHash: }
  me.createUser = async ({ name, email, passwordHash }) => {
    // Opens the MongoDB connection
    const { client, users } = await connect();

    try {
      const user = {
        name,
        email,
        passwordHash,
      };

      const result = await users.insertOne(user);

      return {
        ...user,
        _id: result.insertedId,
      };
    } catch (err) {
      console.error("Error creating user in MongoDB", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  // 2nd Authentication function
  me.findUserByEmail = async (email) => {
    // Opens the MongoDB connection
    const { client, users } = await connect();

    try {
      return await users.findOne({ email });
    } catch (err) {
      console.error("Error finding user by email", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  // 3rd Authentication function
  // Passport will use this when restoring logged-in users from their assocated sessions.
  me.findUserById = async (userId) => {

    // Prevents MongoDB from throwing an error if an invalid ID reaches this function
    if (!ObjectId.isValid(userId)) {
        return null;
    }

    // Opens the MongoDB connection
    const { client, users } = await connect();

    try {
      return await users.findOne({
        _id: new ObjectId(userId),
      });
    } catch (err) {
      console.error("Error finding user by ID", err);
      throw err;
    } finally {
      await client.close();
    }
  };

  return me;
}

const usersDB = UsersDB();

export default usersDB;
