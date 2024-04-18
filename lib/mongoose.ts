import mongoose from "mongoose";

// track connection status
let isConnected = false;

export const connectToDB = async () => {
    // strict query to prevent unknown field queries
    mongoose.set("strictQuery", true);

    if (!process.env.MONGODB_URL) return console.log("MONGODB_URL not found");

    // if already connected, return without creating a new connection
    if (isConnected) {
        console.log("Already connected to MongoDB");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL);

        isConnected = true;

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(error);
    }
};
