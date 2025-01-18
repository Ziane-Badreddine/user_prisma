import Edit from "@/app/_components/edit";
import db from "@/prisma/client";
import React from "react";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const user = await db.user.findUnique({
    where: {
      id: id,
    },
  });

  return (
    <div>
      <Edit user={user} />
    </div>
  );
};

export default page;
