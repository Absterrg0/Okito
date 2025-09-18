'use client'
import { Card,CardTitle,CardHeader,CardContent } from "@/components/ui/card"
import { HugeiconsIcon } from "@hugeicons/react"
import { WebhookIcon, PlusSignIcon, ArrowUp01Icon, ArrowDown01Icon, Alert01Icon, PauseIcon, PlayIcon, Delete01Icon, Link01Icon } from "@hugeicons/core-free-icons"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogOverlay } from "@/components/ui/dialog"
import { z } from "zod"
import { useWebhookMutation } from "@/hooks/webhook/useWebhookMutation"
import { ProjectDetails } from "@/types/project"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Loader from "@/components/ui/loader"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/helpers"
 
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious
} from "@/components/ui/pagination"
import { useTableStateStore } from "@/store/tableStateStore"
import { useWebhookUpdate } from "@/hooks/webhook/useWebhookUpdate"
import WebhookSecretPopover from "./webhook-secret-popover"
export default function WebhookCreation({project}:{project:ProjectDetails}){

    const [isCreateOpen, setIsCreateOpen] = useState(false)
    const [revokeDialogOpen, setRevokeDialogOpen] = useState(false)
    const [webhookToRevoke, setWebhookToRevoke] = useState<{id: string, url: string} | null>(null)
    const itemsPerPage = 5
    
    // Use Zustand store for persistent state
    const {
        webhookCurrentPage: currentPage,
        webhookSortField: sortField,
        webhookSortDirection: sortDirection,
        setWebhookCurrentPage: setCurrentPage,
        handleWebhookSort
    } = useTableStateStore()
    
    const {mutate:createWebhook,isPending:isCreatingWebhook} = useWebhookMutation(project?.id)
    const {mutate:updateWebhook,isPending:isUpdatingWebhook} = useWebhookUpdate(project.id)



    const handleUpdateWebhook = async (id:string, status:'ACTIVE' | 'INACTIVE'| 'REVOKED', url?: string)=>{
      if (!project?.id) {
        toast.info("Please select a project to update webhook")
        return
      }

      if (status === 'REVOKED') {
        setWebhookToRevoke({id, url: url || ''})
        setRevokeDialogOpen(true)
        return
      }

      updateWebhook({id, status}, {
        onSuccess: () => {
          toast.success(status === 'ACTIVE' ? "Webhook activated successfully" : "Webhook paused successfully")
        },
        onError: (error) => {
          toast.error(error.message)
        }
      })
    }

    const confirmRevokeWebhook = () => {
      if (!webhookToRevoke) return

      updateWebhook({id: webhookToRevoke.id, status: 'REVOKED'}, {
        onSuccess: () => {
          toast.success("Webhook revoked successfully")
          setRevokeDialogOpen(false)
          setWebhookToRevoke(null)
        }
      })
    }

    const handleCreateWebhook = async(url: string, description: string) => {
        if (!project?.id) {
          toast.info("Please select a project to create webhook")
          return
        }

        if(webhookFormSchema.safeParse({url, description}).error){
          toast.error("Please enter a valid URL and description")
          return
        }
        
        createWebhook({url, description, projectId: project.id}, {
          onSuccess: () => {
            setIsCreateOpen(false)
            webhookForm.reset()
          }
        })
    }

    // Zod schema for validation
    const webhookFormSchema = z.object({
      url: z
        .string()
        .min(1, "URL is required")
        .url("Please enter a valid URL")
        .refine((url) => {
          try {
            const parsed = new URL(url)
            return ["http:", "https:"].includes(parsed.protocol)
          } catch {
            return false
          }
        }, "Only HTTP and HTTPS protocols are allowed")
        .refine((url) => {
          try {
            const parsed = new URL(url)
            return !["localhost", "127.0.0.1"].includes(parsed.hostname) &&
                   !parsed.hostname.startsWith("192.168.") &&
                   !parsed.hostname.startsWith("10.")
          } catch {
            return false
          }
        }, "Local network URLs are not allowed for webhooks"),
      description: z
        .string()
        .max(100, "Description must be less than 100 characters")
        .or(z.literal(''))
    })

    const webhookForm = useForm({
        defaultValues: {
          url: "",
          description: ''
        },
        validators: {
          onChange: webhookFormSchema,
        },
        onSubmit: async ({value}) => {
          await handleCreateWebhook(value.url.trim(), value.description.trim())
        }
    })

    // Sort and paginate webhooks (react-compiler will optimize this)
    const sortedAndPaginatedWebhooks = (() => {
        if (!project?.webhookEndpoints) return { webhooks: [], totalPages: 0 }

        // Sort webhooks
        const sorted = [...project.webhookEndpoints].sort((a, b) => {
          let aValue: any = a[sortField as keyof typeof a]
          let bValue: any = b[sortField as keyof typeof b]

          // Handle date fields
          if (sortField === 'createdAt') {
            aValue = aValue ? new Date(aValue).getTime() : 0
            bValue = bValue ? new Date(bValue).getTime() : 0
          }

          // Handle string fields
          if (typeof aValue === 'string' && typeof bValue === 'string') {
            aValue = aValue.toLowerCase()
            bValue = bValue.toLowerCase()
          }

          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
          return 0
        })

        // Paginate
        const totalPages = Math.ceil(sorted.length / itemsPerPage)
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedWebhooks = sorted.slice(startIndex, endIndex)

        return { webhooks: paginatedWebhooks, totalPages }
    })()

    const SortButton = ({ field, children }: { field: any; children: React.ReactNode }) => (
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 font-semibold text-foreground hover:text-primary"
          onClick={() => handleWebhookSort(field)}
        >
          <div className="flex items-center gap-1">
            {children}
            {sortField === field && (
              sortDirection === 'asc' ? <HugeiconsIcon icon={ArrowUp01Icon} className="w-4 h-4" /> : <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4" />
            )}
          </div>
        </Button>
    )

    return <Card className=" border-0">
    <CardHeader className="pb-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <CardTitle className="flex items-center gap-3 text-xl">
            <HugeiconsIcon icon={WebhookIcon} className="w-6 h-6 text-primary" />
            Webhook Endpoints
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Configure webhook endpoints to receive real-time event notifications from our platform
          </p>
        </div>

        <div className="flex items-start gap-4">
        <Popover open={isCreateOpen} onOpenChange={(open) => {
          if (!open) {
            setIsCreateOpen(false)
          } else {
            setIsCreateOpen(true)
          }
        }}>
          <PopoverTrigger asChild>
            <Button className="crypto-button" size="sm">
              <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 mr-2" /> Add
            </Button>
          </PopoverTrigger>
          <PopoverContent 
            onAnimationEnd={() => {
              if(!isCreateOpen) {
                webhookForm.reset()
              }
            }} 
            className="w-[480px] p-0 crypto-base border-0" 
            align="end" 
            side="bottom"
            >
            <form
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                webhookForm.handleSubmit()
              }}
              className="p-4 space-y-4"
            >
              <div className="space-y-2">
                <label className="text-sm font-medium">Endpoint URL *</label>
                <webhookForm.Field
                  name="url"
                  children={(field) => (
                    <>
                      <Input
                        placeholder="https://your-app.com/webhooks/okito"
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="crypto-base mt-2"
                        autoFocus
                      />
                      {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {field.state.meta.errors[0]?.message || 'Invalid input'}
                        </p>
                      )}
                    </>
                  )}
                  />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <webhookForm.Field
                  name="description"
                  children={(field) => (
                    <>
                      <Textarea
                        placeholder="Optional description for this webhook endpoint..."
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                        onBlur={field.handleBlur}
                        className="crypto-input resize-none"
                        rows={2}
                      />
                      {field.state.meta.errors && field.state.meta.errors.length > 0 && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {field.state.meta.errors[0]?.message || 'Invalid input'}
                        </p>
                      )}
                      <div className="flex justify-between items-center mt-1">
                        <p className="text-xs text-muted-foreground">
                          {field.state.value.length}/100 characters
                        </p>
                        {field.state.value.length > 80 && field.state.value.length < 100 && (
                          <p className="text-xs text-amber-600 dark:text-amber-400">
                            {100 - field.state.value.length} characters remaining
                          </p>
                        )}
                      </div>
                    </>
                  )}
                  />
              </div>
          
              <div className="flex justify-end gap-2 pt-2">
           
                <Button
                  type="submit"
                  className="crypto-button"
                  size="sm"
                  >
                  {isCreatingWebhook ? (
                    <Loader size={0.1} className="w-4 h-4 mr-2" />
                  ) : (
                    <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 mr-2" />
                  )}
                  Create Webhook
                </Button>
              </div>
            </form>
          </PopoverContent>
        </Popover>
      </div>
      </div>
    </CardHeader>
    <CardContent className="space-y-6">

      {/* Webhook List */}
      {project?.webhookEndpoints.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center gap-6">
          <div className="p-6 rounded-full crypto-base border-2 border-dashed border-border/30">
            <HugeiconsIcon icon={WebhookIcon} className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-3 max-w-md">
            <h3 className="text-lg font-semibold text-foreground">No webhook endpoints configured</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Webhook endpoints allow your application to receive real-time notifications when events occur. 
              Create your first endpoint to start receiving payment notifications and other events.
            </p>
      
          </div>
        </div>
      ) : (
        <div className="crypto-base rounded-lg">
     
          <Table>
            <TableHeader>
              <TableRow className="crypto-input">
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="url">URL</SortButton>
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="status">Status</SortButton>
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="description">Description</SortButton>
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="createdAt">Created</SortButton>
                </TableHead>
                <TableHead className="w-[1%] whitespace-nowrap text-center font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="crypto-glass-static">
            {sortedAndPaginatedWebhooks.webhooks.map((w, index) => (
                <TableRow key={w.id} >
                  <TableCell className="max-w-[360px] text-center">
                    <div className="flex items-center justify-center min-w-0">
                      <a 
                        href={w.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs break-all text-primary hover:text-primary/80   flex items-center gap-1"
                      >
                        {w.url.slice(8, 25)}...
                      </a>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={w.status === 'ACTIVE' 
                        ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' 
                        : 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                      }
                    >
                      {w.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="max-w-[280px] text-center">
                    {w.description ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="cursor-pointer">
                              <span className="text-sm">
                                {w.description.length > 30 
                                  ? `${w.description.substring(0, 30)}...` 
                                  : w.description
                                }
                              </span>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent 
                            className="max-w-80 p-3 crypto-base border-0" 
                            side="top"
                          >
                            <p className="text-sm text-muted-foreground text-wrap break-all leading-relaxed">
                              {w.description}
                            </p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center">{formatDate(w.createdAt)}</TableCell>
                  <TableCell className="text-center">
                      <div className="flex items-center justify-center gap-1">
                        <WebhookSecretPopover webhookId={w.id} />
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleUpdateWebhook(w.id, w.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE', w.url)} 
                                disabled={isUpdatingWebhook}
                                className="crypto-button h-8 w-8 p-0"
                              >
                                {w.status === 'ACTIVE' ? <HugeiconsIcon icon={PauseIcon}  className="w-4 h-4" /> : <HugeiconsIcon icon={PlayIcon} className="w-4 h-4" />}
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="crypto-tooltip border-0">
                              <p>{w.status === 'ACTIVE' ? 'Pause ' : 'Resume '}</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                        
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => handleUpdateWebhook(w.id, 'REVOKED', w.url)} 
                                disabled={isUpdatingWebhook}
                                className="crypto-button h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent className="crypto-tooltip border-0">
                              <p>Revoke </p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination Controls */}
          {sortedAndPaginatedWebhooks.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage > 1) setCurrentPage(currentPage - 1)
                      }}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>

                  {Array.from({ length: sortedAndPaginatedWebhooks.totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        isActive={currentPage === page}
                        className="cursor-pointer"
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (currentPage < sortedAndPaginatedWebhooks.totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === sortedAndPaginatedWebhooks.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </CardContent>
    
    {/* Revoke Confirmation Dialog */}
    <Dialog open={revokeDialogOpen} onOpenChange={setRevokeDialogOpen}>
      <DialogOverlay className="backdrop-blur-sm"></DialogOverlay>
      <DialogContent className="sm:max-w-[425px] crypto-base border-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive brightness-125">
            <HugeiconsIcon icon={Alert01Icon} className="w-5 h-5" />
            Revoke Webhook
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            This action cannot be undone. This will permanently revoke your webhook endpoint and stop all event deliveries.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="gap-2">
          <Button
            variant="destructive"
            onClick={confirmRevokeWebhook}
            disabled={isUpdatingWebhook}
            className="bg-destructive crypto-button hover:bg-destructive/90"
          >
            {isUpdatingWebhook ? (
              <>
                <Loader size={0.1} />
              </>
            ) : (
              <>
                Revoke Webhook
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>

  </Card>
}