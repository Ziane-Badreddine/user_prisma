import db from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
  requst: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json("user not found", { status: 404 });
  }

  const body = await requst.json();

  const userUpdated = await db.user.update({
    where: {
      id: id,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json("story updated", { status: 201 });
}

export async function DELETE(
  requst: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  if (!user) {
    return NextResponse.json("user not found", { status: 404 });
  }

  const userDeleted = await db.user.delete({
    where: {
      id: id,
    },
  });

  return NextResponse.json("story deleted", { status: 201 });
}
