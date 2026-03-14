import DoctorsList from "@/components/modules/Consultation/DoctorsList";
import { getDoctors } from "@/services/doctor.services";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";

const ConsultationPage = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["doctors"],
    queryFn: getDoctors,
  });
 return (
   // Neat! Serialization is now as easy as passing props.
   // HydrationBoundary is a Client Component, so hydration will happen there.
   <HydrationBoundary state={dehydrate(queryClient)}>
      <DoctorsList />
   </HydrationBoundary>
 );
}

export default ConsultationPage