import mongoose from "mongoose";

/**
 * Connects to MongoDB Atlas using MONGODB_URI from .env.
 *
 * Serverless-safe: Vercel functions can spin up multiple concurrent
 * instances and reuse "warm" ones between invocations, so we cache the
 * connection promise on `global` instead of calling `mongoose.connect`
 * fresh every request — that would exhaust Atlas's connection limit
 * within minutes under real traffic. Locally (`npm run dev`/`start`)
 * this still runs exactly once, same as before.
 */
let cached = global._mongooseConn;
if (!cached) {
  cached = global._mongooseConn = { conn: null, promise: null };
}

export async function connectDB() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    const msg =
      "[db] MONGODB_URI is not set. Copy .env.example to .env and fill in your MongoDB Atlas connection string.";
    console.error(msg);
    throw new Error(msg);
  }

  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    mongoose.set("strictQuery", true);
    cached.promise = mongoose
      .connect(uri, { serverSelectionTimeoutMS: 8000 })
      .then((m) => {
        console.log(`[db] Connected to MongoDB: ${m.connection.host}/${m.connection.name}`);
        return m;
      })
      .catch((err) => {
        cached.promise = null;
        console.error("[db] MongoDB connection failed:", err.message);
        throw err;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}
