import mongoose from "mongoose";

const connectDB= async()=>{

     mongoose.connection.on('connected',()=>{
          console.log("Database Connected");
     })
     await mongoose.connect(`${process.env.MONGOOSE_URI}/healthcare`)
}
export default connectDB;
