import fs from "fs";
import path from "path";
import process from "process";
import { fileURLToPath } from "url";
import { MongoClient, ObjectId } from "mongodb";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mongoURI = process.env.MONGODB_URI;
const demoEmail = process.env.DEMO_USER_EMAIL;

if (!mongoURI) {
  console.error("Missing MONGODB_URI.");
  process.exit(1);
}

if (!demoEmail) {
  console.error("Missing DEMO_USER_EMAIL.");
  process.exit(1);
}

const dataPath = path.join(
  __dirname,
  "..",
  "frontend",
  "src",
  "data",
  "TripInfo.json",
);

const client = new MongoClient(mongoURI);

try {
  const rawData = fs.readFileSync(dataPath, "utf8");
  const syntheticTrips = JSON.parse(rawData);

  if (!Array.isArray(syntheticTrips)) {
    throw new Error("TripInfo.json must contain an array.");
  }

  if (syntheticTrips.length < 1000) {
    throw new Error(
      `Expected at least 1,000 records, but found ${syntheticTrips.length}.`,
    );
  }

  await client.connect();

  const db = client.db("finTrip");
  const users = db.collection("users");
  const trips = db.collection("trips");

  const demoUser = await users.findOne({
    email: demoEmail.toLowerCase(),
  });

  if (!demoUser) {
    throw new Error(
      `No Railway user was found with the email ${demoEmail}. Register that user in the deployed app first.`,
    );
  }

  const preparedTrips = syntheticTrips.map((trip) => ({
    ...trip,
    ownerId: new ObjectId(demoUser._id),
    budgetCap: Number(trip.budgetCap),
    travelers: Number(trip.travelers),
    items: Array.isArray(trip.items)
      ? trip.items.map((item) => ({
          ...item,
          cost: Number(item.cost),
        }))
      : [],
    synthetic: true,
  }));

  const existingSyntheticCount = await trips.countDocuments({
    ownerId: demoUser._id,
    synthetic: true,
  });

  if (existingSyntheticCount > 0) {
    console.log(
      `Seed skipped: ${existingSyntheticCount} synthetic trips already exist for ${demoEmail}.`,
    );
    process.exit(0);
  }

  const result = await trips.insertMany(preparedTrips);

  const finalCount = await trips.countDocuments({
    ownerId: demoUser._id,
    synthetic: true,
  });

  console.log(`Inserted records: ${result.insertedCount}`);
  console.log(`Synthetic records for ${demoEmail}: ${finalCount}`);
  console.log("Railway database seeding completed successfully.");
} catch (error) {
  console.error("Railway database seeding failed:", error.message);
  process.exitCode = 1;
} finally {
  await client.close();
}
