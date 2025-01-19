"use client";

import { user } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Loader, Pencil, Router, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const columns: ColumnDef<user>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "prenom",
    header: "Prenom",
  },
  {
    accessorKey: "age",
    header: "Age",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const getDate = row.getValue("createdAt") as Date;

      return <div>{getDate.toDateString()}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const [isDeleted, setIsDeleted] = useState(false);
      const router = useRouter();
      const deleteUser = async () => {
        try {
          setIsDeleted(true);
          const response = await axios.delete(`/api/user/${user.id}`);

          if (response.status === 201) {
            toast.success("user is created", {
              className: "bg-green",
            });
            router.push("/");
          }
        } catch (error) {
          toast.warning("something went wrong", {
            className: "bg-rose-500 text-white",
          });
        } finally {
          setIsDeleted(false);
        }
      };

      return (
        <div className="flex items-center justify-center gap-2">
          <Button
            size={"icon"}
            variant={"outline"}
            className="flex items-center bg-red-600 "
            onClick={deleteUser}
          >
            {isDeleted ? (
              <Loader className="h-5 w-5 animate-spin" />
            ) : (
              <Trash2 className="h-5 w-5" />
            )}
          </Button>
          <Button size={"icon"} className="flex items-center">
            <Link href={`/user/${user.id}`}>
              <Pencil className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      );
    },
  },
];
