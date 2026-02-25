/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { getDoctors } from '@/app/(commonLayout)/consultation/_actions';
import { useQuery } from '@tanstack/react-query';

export default function DoctorsList() {
  const { data } = useQuery({
    queryKey: ['doctors'],
    queryFn: () => getDoctors(),
  });
  console.log(data);

  //^ Non-prefetched data fetching example. Data will be fetched after render, not suitable for SSR and mapping over data
  //   const { data: nonPrefetchedData } = useQuery({
  //     queryKey: ['doctors-non-prefetched'],
  //     queryFn: () => getDoctors(),
  //   });
  //   console.log(nonPrefetchedData);

  return (
    <div>
      <h2>DoctorsList</h2>

      {data?.data?.map((doctor: any) => (
        <p key={doctor.id}>{doctor.name}</p>
      ))}
    </div>
  );
}
