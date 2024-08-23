import { NextResponse } from "next/server";
import { connectToDataBase } from "../database";
import verifyOtp from "@/app/model/verifyotp/model";
import registerUsers from "@/app/model/reqister/model";
import NodeMailer from "nodemailer";

var transport = NodeMailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: "sairamireddy000@gmail.com",
    pass: "famhjaahbulhytdn",
  },
});

export const POST = async (req, res) => {
  await connectToDataBase();
  let body = await req.json();

  let updatedData = { ...body, otp: Math.floor(Math.random() * 9000 + 1000) };
  const options = {
    from: "sairamireddy@gmail.com",
    to: body.email,
    subject: "otp verification",
    text: `Yor Otp is ${updatedData.otp}`,
  };
  transport.sendMail(options, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("response", response);
    }
  });
  await verifyOtp.deleteOne({ email: body.email });
  await verifyOtp.create(updatedData);
  return NextResponse.json({
    response: "success",
    message: `Otp is successfully send to ${body.email}`,
  });
};

export const PUT = async (req, res) => {
  await connectToDataBase();
  let body = await req.json();
  let user = await verifyOtp.findOne({ email: body.email });

  if (user.otp == body.otp) {
    await registerUsers.create({ email: user.email, password: user.password });
    return NextResponse.json({
      response: "success",
      message: `Otp is matched successfully`,
    });
  } else {
    return NextResponse.json({
      response: "error",
      message: `Otp is not matching`,
    });
  }
};
