import db from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(requst: NextRequest) {
  const body = await requst.json();

  const newUser = await db.user.create({
    data: {
      ...body,
    },
  });
  return NextResponse.json(newUser,{status: 201})
}


export async function GET(requst: NextRequest){
  const users = await db.user.findMany()
  

  return NextResponse.json(users,{status: 201})
}