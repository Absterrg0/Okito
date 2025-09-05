import { toast } from "sonner"
import { trpc } from "@/lib/trpc"

export const useWebhookMutation = (projectId: string | undefined) => {
  const utils = trpc.useUtils()

  return trpc.webhook.create.useMutation({
    onMutate: async (newWebhook) => {
      if (!projectId) return

      await utils.webhook.list.cancel({ projectId })

      const prev = utils.webhook.list.getData({ projectId })

      utils.webhook.list.setData({ projectId }, (old) => [
        ...(old ?? []),
        {
          id: "b7e6f8c2-1a2b-4d3e-9f5a-8c7d6e5f4a3b",
          url: newWebhook.url,
          description: newWebhook.description,
          status: "ACTIVE" as const,
          createdAt: new Date().toISOString(),
          lastTimeHit: null,
          secret: "••••••",
        },
      ])

      return { prev }
    },

    onSuccess: () => {
      if (!projectId) return
      utils.webhook.list.invalidate({ projectId })
      toast.success("Webhook created successfully")
    },

    onError: (error, _variables, ctx) => {
      if (ctx?.prev && projectId) {
        utils.webhook.list.setData({ projectId }, ctx.prev)
      }
      toast.error(error.message || "Failed to create webhook. Please try again.")
    },

    onSettled: () => {
      if (!projectId) return
      utils.webhook.list.invalidate({ projectId })
    },
  })
}
