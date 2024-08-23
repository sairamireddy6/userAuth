import { NextResponse } from "next/server";
import { connectToDataBase } from "../database";
import registerUsers from "@/app/model/reqister/model";
import { cookies } from "next/headers";

export const POST = async (req, res) => {
  await connectToDataBase();
  let body = await req.json();
  let user = await registerUsers.findOne({ email: body.email });
  const cookieStore = cookies();
  if (!user) {
    return NextResponse.json({
      response: "register",
      message: `Need to register`,
    });
  }
  if (user.password == body.password) {
    cookieStore.set("userAuthSession", body.email);
    return NextResponse.json({
      response: "success",
      message: `Login successfully`,
    });
  } else {
    return NextResponse.json({
      response: "error",
      message: `please check your password`,
    });
  }
};
