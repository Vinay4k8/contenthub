import mongoose from "mongoose"
import { string } from "zod";


const connectToDB=async()=>{
    if(mongoose.connection.readyState===1){
        return mongoose.connection.asPromise();
    }
    else{
        const url:string=process.env.MONGODB_URL!
        return mongoose.connect(url);
        }

}

export default connectToDB;