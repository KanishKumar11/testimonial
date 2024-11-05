import mongoose from "mongoose";

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGODB_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB connected successfully");
    });
  } catch (error) {
    console.log("Something goes wrong!");
    console.log(error);
  }
}
