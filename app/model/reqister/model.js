import mongoose from "mongoose";

let registerUsers = mongoose.Schema({
     email: String,
     password: String
},
{
    timestamps:true
}

)

export default mongoose.models.registerUsers || mongoose.model("registerUsers",registerUsers)