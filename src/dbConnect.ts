import { connect } from "mongoose";

export const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URL ;
    if(mongoURI === undefined){
        throw new Error("Mongo URI is not defined");
    }
    await connect(mongoURI);
    console.log("MongoDB Connected...");
  } catch (err) {
    console.error(err);
    // Exit process with failure
    console.log(err);
    process.exit(1);
  }
};

export default connectDB;