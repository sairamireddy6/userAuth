import mongoose from "mongoose";

let verifyOtp = mongoose.Schema({
     email: String,
     password: String,
     otp:String
},
{
    timestamps:true
}

)

export default mongoose.models.verifyOtp || mongoose.model("verifyOtp",verifyOtp)