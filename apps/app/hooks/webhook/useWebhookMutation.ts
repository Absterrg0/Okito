import { toast } from "sonner"
import { trpc } from "@/lib/trpc"

export const useWebhookMutation = (projectId: string | undefined) => {
  const utils = trpc.useUtils()

  return trpc.webhook.create.useMutation({
    onSuccess: (data) => {
      if (!projectId) return

      toast.success("Webhook created successfully")

      utils.project.details.setData({ id: projectId }, (old) => {
        if (!old) return old

        return {
          ...old,
          webhookEndpoints: [
            ...(old.webhookEndpoints ?? []),
            {
              ...data,
              projectId: projectId,
              lastTimeHit: null
            }
          ]
        }
      })
    },

    onError: (error) => {
      toast.error(error.message || "Failed to create webhook. Please try again.")
    }
  })
}
