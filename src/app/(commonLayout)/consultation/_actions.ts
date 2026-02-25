'use server';

import { httpClient } from '@/lib/axios/httpClient';

//@ This is an undetectable file by Nextjs routing (starting with underscore)

export const getDoctors = async () => {
  const doctors = await httpClient.get('/doctors');
  console.log(doctors, 'server');
  return doctors;
};
