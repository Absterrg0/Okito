import { trpc } from "@/lib/trpc";
import {toast} from 'sonner'

export function useProjectLogoUpdate(projectId:string|undefined|null) {
  const utils = trpc.useUtils();

  return trpc.project.updateProjectLogo.useMutation({
    onMutate: async (updatedProject) => {
      if (!updatedProject || !projectId) return;
      const prevDetails = utils.project.details.getData({ id: projectId });      
      // Optimistically update project details cache with logo URL
      utils.project.details.setData({ id: projectId }, (old) =>
        old ? { ...old, logoUrl: updatedProject.logoUrl } : old
      );

      return { prevDetails};
    },

    onSuccess: (data) => {
      if (!data || !projectId) return;
      // Ensure details cache reflects server response
      utils.project.details.setData({ id: projectId }, (old) =>
        old ? { ...old, logoUrl: data.logoUrl } : old
      );

      toast.success("Project logo updated successfully!");
    },

    onError: (error, _updatedProject, context) => {
      if (context?.prevDetails && projectId) {
        utils.project.details.setData({ id: projectId }, context.prevDetails);
      }
      toast.error(error.message || "Failed to update project logo. Please try again.");
    },
  });
}
