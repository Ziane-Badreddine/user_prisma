import db from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  requst: NextRequest,
  { params }: { params: { userId: string } }
) {
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    return NextResponse.json("user not found", { status: 404 });
  }

  const userDeleted = await db.user.delete({
    where: {
      id: params.userId,
    },
  });

  return NextResponse.json(userDeleted, { status: 201 });
}
