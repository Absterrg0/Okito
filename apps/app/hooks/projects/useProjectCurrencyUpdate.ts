import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export function useProjectCurrencyUpdate(projectId:string|undefined|null) {
  const utils = trpc.useUtils();

  return trpc.project.updateProjectCurrencies.useMutation({
    onMutate: async (updatedProject) => {
      if (!updatedProject || !projectId) return;
      const prevDetails = utils.project.details.getData({ id: projectId });      
      // Optimistically update project details cache with currencies
      utils.project.details.setData({ id: projectId }, (old) =>
        old ? { ...old, acceptedCurrencies: updatedProject.acceptedCurrencies  ? updatedProject.acceptedCurrencies : []} : old
      );

      return { prevDetails};
    },

    onSuccess: (data) => {
      if (!data || !projectId) return;
      // Ensure details cache reflects server response
      utils.project.details.setData({ id: projectId }, (old) =>
        old ? { ...old, acceptedCurrencies: data.acceptedCurrencies } : old
      );

      toast.success("Project currencies updated successfully!");
    },

    onError: (error, _updatedProject, context) => {
      if (context?.prevDetails && projectId) {
        utils.project.details.setData({ id: projectId }, context.prevDetails);
      }
      toast.error(error.message || "Failed to update project currencies. Please try again.");
    },
  });
}
