import mongoose from "mongoose";

async function Dbconnection() {

    try {
         await mongoose.connect(process.env.MONGODB_URL, {dbName: 'blinkit'});
         console.log("DB connection succssesfully")
    } catch (error) {
        console.log(error)
    }
 

 
   
}

export default Dbconnection; 