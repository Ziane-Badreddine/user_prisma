import { DataTable } from "@/components/ui/data-table";
import db from "@/prisma/client";
import { columns } from "./_components/columns";


export default async function Home() {

  const users = await db.user.findMany()
  return (
    <>
      <div className="flex flex-col gap-10 items-center justify-center w-screen mt-10">
        <DataTable data={users} columns={columns} />
      </div>
    </>
  );
}
