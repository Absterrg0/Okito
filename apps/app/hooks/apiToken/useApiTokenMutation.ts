import { toast } from "sonner";
import { trpc } from "@/lib/trpc";


export const useApiTokenMutation = (projectId: string | undefined) => {
    const utils = trpc.useUtils();

    return trpc.apiToken.create.useMutation({
        onSuccess: (data) => {
            if(!projectId) return;

            const {rawToken, ...safeData} = data;

            if(rawToken){
                toast.success("API token created successfully");
            }

            // Update the project details cache with the new token
            utils.project.details.setData({id: projectId}, (old) => {
                if(!old) return old;

                return {
                    ...old,
                    apiTokens: [
                        ...(old.apiTokens ?? []),
                        safeData
                    ]
                };
            });
        },
        onError: () => {
            toast.error("Failed to create API token. Please try again.");
        }
    });
}