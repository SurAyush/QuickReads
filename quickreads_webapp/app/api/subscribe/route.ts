export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import redis_client from "@/helpers/redis";
import {query} from "@/lib/db";

interface RequestBody {
  otp: string;
  email: string;
}

export async function POST(req: NextRequest) {
  try {
    const body:RequestBody = await req.json();
    let {otp, email} = body;

    if(!otp || !email) {
        return NextResponse.json(
            {
            status: 400,
            message: "Please provide all the fields",
            },
            { status: 400 }
        );
    }

    // trimming whitespaces
    otp = otp.trim();
    email = email.trim();

    // check for registered user
    let q = `SELECT * FROM subscriber WHERE email_address=$1`;
    const isExisting = await query(q,[email]);
    if (isExisting.length > 0) {
      return NextResponse.json(
        {
          status: 409,
          message: "User already exists",
        },
        { status: 400 }
      );
    }

    const value = await redis_client.get(email);
    if (!value) {
      return NextResponse.json(
        {
          status: 400,
          message: "Verification not done!",
        },
        { status: 400 }
      );
    }

    const { hashedOTP } = await JSON.parse(value);
    
    const isOTPCorrect = await bcryptjs.compare(otp, hashedOTP);
    if (!isOTPCorrect) {
      return NextResponse.json(
        {
          status: 400,
          message: "Invalid OTP!",
        },
        { status: 400 }
      );
    }

    await redis_client.del(email);

    q = `INSERT INTO subscriber (email_address) VALUES ($1) RETURNING *`;
    const result = await query(q, [email]);

    if (result.length > 0) {
        console.log("Insert successful:", result[0]);
        return NextResponse.json(
            {
            status: 200,
            message: "User registered successfully",
            data: result[0],
            },
            { status: 200 }
        );
    }
    else {
      console.log("Insert failed!");
      return NextResponse.json(
        {
          status: 500,
          message: "Internal Server Error",
        },
        { status: 500 }
      );
    }

  } catch (error) {
    console.log("Error in registration: ", error);
    return NextResponse.json(
      {
        status: 500,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}