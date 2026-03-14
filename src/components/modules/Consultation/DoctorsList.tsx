/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getDoctors } from "@/app/(commonLayout)/consultation/_actions";
import { useQuery } from "@tanstack/react-query";

const DoctorsList = () => {
     const { data : doctorData } = useQuery({
       queryKey: ["doctors"],
       queryFn: () => getDoctors(),
     });


     //non-prefetched query example
    //  const {data : nonPrefetchedData} = useQuery({
    //    queryKey: ["doctors-non-prefetched"],
    //    queryFn: () => getDoctors(),
    //  });


  return (
    <div>{doctorData!.data.map((doctor: any) => (
      <div key={doctor.id}>{doctor.name}</div>
    ))}</div>
  )
}

export default DoctorsList