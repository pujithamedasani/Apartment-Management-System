
//  src/config/db.js  –  MongoDB connection
//
//  HOW TO USE:
//    1. Open backend/.env
//    2. Set MONGODB_URI to your MongoDB connection string, e.g.:
//         Local  → mongodb://localhost:27017/apartment_mgmt
//         Atlas  → mongodb+srv://<user>:<pass>@cluster.mongodb.net/apartment_mgmt
//    3. Run `npm install` inside /backend, then `npm run dev`
//
//  The app will print " MongoDB connected" once the URI is set and valid.
//  Until then the server still starts (for front-end review) but DB calls
//  will fail gracefully.
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn(
      '  MONGODB_URI is not set in .env – running WITHOUT database.\n' +
      '   Set the URI and restart to enable full persistence.'
    );
    return;
  }

  try {
    const conn = await mongoose.connect(uri, {
      // These options silence deprecation warnings in Mongoose 8+
      serverSelectionTimeoutMS: 5000,
    });
    console.log('MongoDB connected: ${conn.connection.host}');
  } catch (err) {
    console.error(' MongoDB connection failed:', err.message);
  }
};

export default connectDB;
