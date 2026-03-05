import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import Guest from "../models/guestModel.js";

let guests = [{ name: "Guest 1" }, { name: "Guest 2" }, { name: "Guest 3" }];

dotenv.config();

const connectionStr = process.env.MONGO_URI || "";

async function seedGuests() {
  console.log(`🚀 Seed Start`);
  try {
    await mongoose.connect(connectionStr);
    console.log(`✅ Database Connected`);

    await Guest.deleteMany({});
    console.log(`✅ Cleared DB of previous guests`);

    // Guest token creation
    guests = guests.map((guest) => {
      const token = crypto.randomBytes(16).toString("hex");
      return { ...guest, inviteToken: token };
    });
    console.log(`✅ Created Guest tokens`);

    await Guest.create(guests);
    console.log(`✅ Added guests to DB`);

    console.log(`🎉 DB Seed complete`);
    process.exit(1);
  } catch (error) {
    console.error(error.message);
  }
}

seedGuests();
