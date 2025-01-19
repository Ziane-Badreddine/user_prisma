import Edit from "@/app/_components/edit";
import db from "@/prisma/client";
import React from "react";

const page = async (props: { params: Promise<{ userId: string }> }) => {
    const params = await props.params

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
