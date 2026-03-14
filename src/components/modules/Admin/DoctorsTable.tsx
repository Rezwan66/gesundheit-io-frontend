"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getDoctors } from "@/services/doctor.services";
import { useQuery } from "@tanstack/react-query";
import {
    flexRender,
    getCoreRowModel,
    useReactTable
} from "@tanstack/react-table";


const DoctorsTable = () => {

    const doctorColumns = [
      { accessorKey: "name", header: "Name" },
    //   { accessorKey: "specialization", header: "Specialization" },
      { accessorKey: "experience", header: "Experience" },
    //   { accessorKey: "rating", header: "Rating" },
    ];

   

    const { data : doctorDataResponse } = useQuery({
        queryKey: ["doctors"],
        queryFn: getDoctors
    });

    const { data : doctors } = doctorDataResponse! || [];


    const { getHeaderGroups, getRowModel } = useReactTable({
       data: doctors,
       columns: doctorColumns,
       getCoreRowModel: getCoreRowModel(),
    });   

    // console.log(doctorDataResponse?.data.map(doctor => doctor.name));

    console.log(doctors);
  return (
    <Table>
      <TableHeader>
        {getHeaderGroups().map((hg) => (
          <TableRow key={hg.id}>
            {hg.headers.map((header) => (
              <TableHead key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default DoctorsTable