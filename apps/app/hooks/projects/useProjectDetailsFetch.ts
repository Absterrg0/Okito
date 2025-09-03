import { useSelectedProjectStore } from "@/store/projectStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface ApiToken {
    id: string;
    tokenHash: string;
    name: string;
    environment: string;
    allowedDomains: string[];
    lastUsedAt: Date;
    requestCount: number;
    createdAt: Date;
    revokedAt: Date;
    status: string;
}
interface WebhookEndpoint {
    id: string;
    url: string;
    description: string;
    status: string;
}


interface Project {
    id: string;
    name: string;
    createdAt:Date;
    updatedAt:Date;
    apiTokens: ApiToken[];
    webhookEndpoints: WebhookEndpoint[];
  }


interface Response{
    msg:string,
    project:Project
}


export function useProjectFetchDetails(projectId: string | null | undefined) {
  return useQuery({
    queryFn: async () => {
      if (!projectId) {
        throw new Error('Project ID is required');
      }
      const response = await axios.get<Response>(`/api/projects/${projectId}`);
      return response.data.project;
    },
    staleTime:1000 * 60,
    queryKey: ['project-details', projectId],
    enabled: !!projectId, // Only run query when projectId exists
  });
}