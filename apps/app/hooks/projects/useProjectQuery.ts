import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Project {
  id: string;
  name: string;
}

export function useProjectsQuery() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: async () => {
      const response = await axios.get<Project[]>('/api/projects');
      return response.data;
    },
    staleTime:1000*60*10
  });
}