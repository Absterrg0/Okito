import { trpc } from "@/lib/trpc";

export function useProjectFetchDetails(projectId: string | null | undefined) {
  return trpc.project.details.useQuery(
    { id: projectId! },
    {
      staleTime: 1000 * 60,
      enabled: !!projectId, // Only run query when projectId exists
    }
  );
}