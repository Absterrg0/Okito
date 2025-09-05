import { trpc } from "@/lib/trpc";
import { toast } from 'sonner'

export const useApiTokenDeletion = (projectId: string | undefined) => {
    const utils = trpc.useUtils();

    return trpc.apiToken.delete.useMutation({
        onSuccess: (_, variables) => {
            if (!projectId) return;

            // Update the cache by removing the deleted token
            utils.project.details.setData({ id: projectId }, (old) => {
                if (!old) return old;

                return {
                    ...old,
                    apiTokens: old.apiTokens.filter(token => token.id !== variables.id)
                };
            });

            toast.success("API token revoked successfully");
        },
        onError: () => {
            toast.error("Failed to revoke API token. Please try again.");
        }
    });
}