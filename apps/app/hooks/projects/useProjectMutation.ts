import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export function useCreateProjectMutation() {
  const utils = trpc.useUtils();

  return trpc.project.create.useMutation({
    onMutate: async (newProject) => {
      if (!newProject) return;

      await utils.project.list.cancel();

      const prevProjects = utils.project.list.getData();

      utils.project.list.setData(undefined, (old) => [
        ...(old ?? []),
        { id: "temp-id", name: newProject.name },
      ]);

      return { prevProjects };
    },

    onSuccess: (data) => {
      utils.project.list.setData(undefined, (old) =>
        old
          ? old.map((proj) =>
              proj.id === "temp-id" ? { ...proj, id: data.id, name: data.name } : proj
            )
          : [data]
      );
      toast.success(`Project "${data.name}" created successfully!`);
    },

    onError: (error, _newProject, context) => {
      if (context?.prevProjects) {
        utils.project.list.setData(undefined, context.prevProjects);
      }
      toast.error(error.message || "Failed to create project. Please try again.");
    },
  });
}
