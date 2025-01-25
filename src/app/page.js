"use client";

import ShadcnTable from "@/components/Shadcn-Table/ShadcnTable";
import { useMemo, useState, useEffect } from "react";

export default function Home() {
  const columns = useMemo(() => [
    { header: "Name", accessorKey: "name", cell: ({ row }) => <div className="truncate font-medium">{row.getValue("name")}</div>, sortUndefined: "last", sortDescFirst: false, },
    { header: "Email", accessorKey: "email", },
    {
      header: "Location",
      accessorKey: "location",
      cell: ({ row }) => (
        <div className="truncate">
          <span className="text-lg leading-none">{row.original.flag}</span> {row.getValue("location")}
        </div>
      ),
    },
    { header: "Status", accessorKey: "status", },
    {
      header: "Balance", accessorKey: "balance",
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("balance"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return formatted;
      },
    },
    { header: "Department", accessorKey: "department", },
    { header: "Role", accessorKey: "role", },
    { header: "Join Date", accessorKey: "joinDate", },
    { header: "Last Active", accessorKey: "lastActive", },
    { header: "Performance", accessorKey: "performance", },
  ], []);

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch(
        "https://res.cloudinary.com/dlzlfasou/raw/upload/users-01_fertyx.json",
      );
      const data = await res.json();
      setData(data.slice(0, 10)); // Limit to 5 items
    }
    fetchPosts();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
        <ShadcnTable columns={columns} data={data} />
    </div>
  );
}
