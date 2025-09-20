import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useSelectedProjectStore } from "@/store/projectStore";

export function useProjectDetailsUpdate(projectId:string|undefined|null) {
  const utils = trpc.useUtils();

  return trpc.project.updateProjectDetails.useMutation({
    onMutate: async (updatedProject) => {
      if (!updatedProject || !projectId) return;

      await Promise.all([
        utils.project.details.cancel({ id: projectId }),
        utils.project.list.cancel(),
      ]);

      const prevDetails = utils.project.details.getData({ id: projectId });
      const prevList = utils.project.list.getData();
      const prevSelected = useSelectedProjectStore.getState().selectedProject;

      // Optimistically update project details cache
      utils.project.details.setData({ id: projectId }, (old) =>
        old ? { ...old, name: updatedProject.name, description: updatedProject.description ?? null } : old
      );

      // Optimistically update project list cache (name only)
      utils.project.list.setData(undefined, (old) =>
        old ? old.map((p) => (p.id === projectId ? { ...p, name: updatedProject.name } : p)) : old
      );

      // Optimistically update selected project (zustand)
      if (prevSelected?.id === projectId) {
        useSelectedProjectStore.getState().setSelectedProject({ id: projectId, name: updatedProject.name });
      }

      return { prevDetails, prevList, prevSelected };
    },

    onSuccess: (data) => {
      if (!data || !projectId) return;
      // Ensure details cache reflects server response
      utils.project.details.setData({ id: projectId }, (old) =>
        old ? { ...old, name: data.name, description: data.description } : old
      );
      // Ensure list cache has the latest name
      utils.project.list.setData(undefined, (old) =>
        old ? old.map((p) => (p.id === projectId ? { ...p, name: data.name } : p)) : old
      );

      // Sync selected project (zustand)
      const current = useSelectedProjectStore.getState().selectedProject;
      if (current?.id === projectId) {
        useSelectedProjectStore.getState().setSelectedProject({ id: projectId, name: data.name });
      }
      toast.success(`Project "${data.name}" updated successfully!`);
    },

    onError: (error, _updatedProject, context) => {
      if (context?.prevDetails && projectId) {
        utils.project.details.setData({ id: projectId }, context.prevDetails);
      }
      if (context?.prevList) {
        utils.project.list.setData(undefined, context.prevList);
      }
      if (context?.prevSelected) {
        useSelectedProjectStore.getState().setSelectedProject(context.prevSelected);
      }
      toast.error(error.message || "Failed to update project. Please try again.");
    },
  });
}
