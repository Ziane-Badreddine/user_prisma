import Edit from "@/app/_components/edit";
import db from "@/prisma/client";
import React from "react";

const page = async ({ params }: { params: {userId: string} }) => {

  const user = await db.user.findUnique({
    where: {
      id: params.userId
    },
  });

  return (
    <div>
      <Edit user={user} />
    </div>
  );
};

export default page;
