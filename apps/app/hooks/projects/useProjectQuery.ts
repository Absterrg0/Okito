import { trpc } from "@/lib/trpc";
export function useProjectsQuery() {
  return trpc.project.list.useQuery(undefined,{
    staleTime:1000*60*10,
    
  });
}