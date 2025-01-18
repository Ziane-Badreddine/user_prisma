import db from "@/prisma/client";
import { notFound } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(requst: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });

  if (!user) {
    return NextResponse.json("user not found", { status: 404 });
  }

  const body = await requst.json();

  const userUpdated = await db.user.update({
    where: {
      id: params.userId,
    },
    data: {
      ...body,
    },
  });

  return NextResponse.json("story updated", { status: 201 });
}

export async function DELETE(requst: NextRequest, props: { params: Promise<{ userId: string }> }) {
  const params = await props.params;
  const user = await db.user.findUnique({
    where: {
      id: params.userId,
    },
  });
  if (!user) {
    notFound();
  }
  if (!user) {
    return NextResponse.json("user not found", { status: 404 });
  }

  const userDeleted = await db.user.delete({
    where: {
      id: params.userId,
    },
  });

  return NextResponse.json("story deleted", { status: 201 });
}
