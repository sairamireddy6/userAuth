import mongoose from "mongoose"


export const connectToDataBase = async ()=>{
    await mongoose.connect('mongodb+srv://sairamiredy:sairam2683@cluster0.nk1ms.mongodb.net/userAuth').then(()=>{
        console.log("Connected to dataBase");
    })
}