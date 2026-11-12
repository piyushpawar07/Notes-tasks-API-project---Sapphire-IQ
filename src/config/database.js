import mongoose from 'mongoose';

function connectToDB(){
    mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("MongoDb connected successfully");
    })
    .catch((err)=>{
        console.error("Database Connection Error: ",err);
    })
}

export default connectToDB;