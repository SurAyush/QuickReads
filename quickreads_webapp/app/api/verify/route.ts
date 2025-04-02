export const dynamic = "force-dynamic";
import { NextRequest, NextResponse} from "next/server";
import sendEmail from "@/helpers/mailer";
import bcryptjs from "bcryptjs";
import redis_client from "@/helpers/redis";
import { mailOptions } from "@/helpers/mailer";

type redis_value = {
  hashedOTP: string;
};


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email } = body;
    
    // OTP generation
    const max = 1000000;
    const OTP: string = String(Math.floor(Math.random() * max)).padStart(
      6,
      "0"
    );

    // hashing OTP
    const salt = await bcryptjs.genSalt(10);
    const hashedOTP = await bcryptjs.hash(OTP, salt);

    // storing OTP in DB
    const value: redis_value = {
      hashedOTP: hashedOTP
    };
    await redis_client.set(email, JSON.stringify(value));
    await redis_client.expire(email, 600); 

    if (!process.env.MAIL_ID) {
      return NextResponse.json({ message: ".env missing" }, { status: 500 });
    }

    const maildata: mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "OTP Verification For Registration in Anant",
      text: `Please don't share the OTP with anyone.\n Your OTP for subscribing QuickReads daily newspaper is ${OTP}. \n Validity ends in 10 minutes \n Thank You`,
    };

    try {
      await sendEmail(maildata);
      console.log(OTP);
    } catch (err) {
      console.log("error occured\n", err);
      return NextResponse.json({ message: "Internal Server Error: Sending email-failed"}, { status: 500 });
    }

    return NextResponse.json({ message: "Email sent successfully" },{ status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}