import { Card,CardHeader,CardTitle,CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HugeiconsIcon } from "@hugeicons/react"
import { Key01Icon, PlusSignIcon, Delete01Icon, ArrowUp01Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons"
import Loader from "@/components/ui/loader"
import { Badge } from "@/components/ui/badge"
import { Table, TableHeader, TableBody, TableRow, TableCell, TableHead } from "@/components/ui/table"
import { formatDate } from "@/lib/helpers"
import { toast } from "sonner"
import { ProjectDetails } from "@/types/project"
import { useApiTokenMutation } from "@/hooks/apiToken/useApiTokenMutation"
import { useApiTokenDeletion } from "@/hooks/apiToken/useApiTokenDeletion"
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
} from "@/components/ui/pagination"
import { useState } from "react"
import { DeleteTokenConfirmationDialog } from "./delete-token-confirmation-dialog"
import { useTableStateStore } from "@/store/tableStateStore"




interface ApiTokenCreationProps{
    project:ProjectDetails,
    setShowTokenDialog:(value:boolean)=>void,
    setNewlyCreatedToken:(value:string)=>void
}


export default function ApiTokenCreation({project,setShowTokenDialog,setNewlyCreatedToken}:ApiTokenCreationProps){
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [tokenIdToDelete, setTokenIdToDelete] = useState<string | null>(null)
    const itemsPerPage = 5
    
    // Use Zustand store for persistent state
    const {
        apiTokenCurrentPage: currentPage,
        apiTokenSortField: sortField,
        apiTokenSortDirection: sortDirection,
        setApiTokenCurrentPage: setCurrentPage,
        handleApiTokenSort
    } = useTableStateStore()
    
    const {mutate:createApiToken,isPending:isCreatingApiToken} = useApiTokenMutation(project?.id)
    const {mutate:deleteApiToken,isPending:isDeletingApiToken} = useApiTokenDeletion(project?.id)
     const handleCreateApiToken = async (environment: 'TEST' | 'LIVE')=>{
    if(!project.id){
      toast.info("Please select a project to create an API token")
      return
    }
    createApiToken({projectId:project?.id,environment},{
      onSuccess:(data) => {
        setShowTokenDialog(true);
        setNewlyCreatedToken(data.rawToken);
      }
    })
  }

  const handleDeleteApiToken = (tokenId: string) => {
    setTokenIdToDelete(tokenId)
    setDeleteDialogOpen(true)
  }

  const confirmDeleteToken = () => {
    if (!tokenIdToDelete || !project?.id) {
      toast.info("Please select a project to delete an API token")
      return
    }
    
    deleteApiToken({ id: tokenIdToDelete }, {
      onSuccess: () => {
        setDeleteDialogOpen(false)
        setTokenIdToDelete(null)
      }
    })
  }

    // Sort and paginate tokens (react-compiler will optimize this)
    const sortedAndPaginatedTokens = (() => {
        if (!project?.apiTokens) return { tokens: [], totalPages: 0 }

        // Sort tokens
        const sorted = [...project.apiTokens].sort((a, b) => {
          let aValue: any = a[sortField as keyof typeof a]
          let bValue: any = b[sortField as keyof typeof b]

          // Handle date fields
          if (sortField === 'createdAt' || sortField === 'lastUsedAt') {
            aValue = aValue ? new Date(aValue).getTime() : 0
            bValue = bValue ? new Date(bValue).getTime() : 0
          }

          // Handle null/undefined values for lastUsedAt
          if (sortField === 'lastUsedAt') {
            if (!aValue && !bValue) return 0
            if (!aValue) return 1
            if (!bValue) return -1
          }

          if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1
          if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1
          return 0
        })

        // Paginate
        const totalPages = Math.ceil(sorted.length / itemsPerPage)
        const startIndex = (currentPage - 1) * itemsPerPage
        const endIndex = startIndex + itemsPerPage
        const paginatedTokens = sorted.slice(startIndex, endIndex)

        return { tokens: paginatedTokens, totalPages }
    })()

  const SortButton = ({ field, children }: { field: any; children: React.ReactNode }) => (
    <Button
      variant="ghost"
      size="sm"
      className="h-auto p-0 font-semibold text-foreground hover:text-primary"
      onClick={() => handleApiTokenSort(field)}
    >
      <div className="flex items-center gap-1">
        {children}
        {sortField === field && (
          sortDirection === 'asc' ? <HugeiconsIcon icon={ArrowUp01Icon} className="w-4 h-4" /> : <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4" />
        )}
      </div>
    </Button>
  )

    return     <Card className="crypto-glass-static border-0">
    <CardHeader className="pb-4">
      <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-3 text-xl">
          <HugeiconsIcon icon={Key01Icon} className="w-6 h-6 text-primary" />
          API Tokens
        </CardTitle>
        <div className="flex items-center gap-2">
          <Button size="sm" className="crypto-button" onClick={() =>handleCreateApiToken('TEST')  }>
            {isCreatingApiToken ? <Loader size={0.1} className="w-4 h-4 mr-2" /> : <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 mr-2" />}
            Development
          </Button>
          <Button size="sm" variant="outline" className="crypto-button" onClick={() =>handleCreateApiToken('LIVE')}>
            {isCreatingApiToken ? <Loader size={0.1} className="w-4 h-4 mr-2" /> : <HugeiconsIcon icon={PlusSignIcon} className="w-4 h-4 mr-2" />}
            Production
          </Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
         Keep your production tokens safe and never expose them publicly.
      </p>
    </CardHeader>
    <CardContent>
      {project?.apiTokens.length === 0 ? (
        <div className="flex flex-col items-center   justify-center py-12 text-center gap-4">
          <div className="p-4 rounded-full">
            <HugeiconsIcon icon={Key01Icon} className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h3 className="font-medium">No API tokens yet</h3>
            <p className="text-sm text-muted-foreground max-w-md">
              Create your first API token to start integrating with our services. You can create separate tokens for development and production environments.
            </p>
          </div>
        </div>
      ) : (
        <div className="crypto-glass-static rounded-lg">
          <Table className=''>
            <TableHeader>
              <TableRow className=" crypto-glass-static border-b border-border/10">
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="environment">Environment</SortButton>
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="createdAt">Created</SortButton>
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="lastUsedAt">Last used</SortButton>
                </TableHead>
                <TableHead className="font-semibold text-foreground text-center">
                  <SortButton field="requestCount">Requests</SortButton>
                </TableHead>
                <TableHead className="w-[1%] whitespace-nowrap text-center font-semibold text-foreground">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className=''>
              {sortedAndPaginatedTokens.tokens.map((t) => (
                <TableRow key={t.id} >
                  <TableCell className="text-center">
                    <Badge 
                      variant="outline" 
                      className={t.environment === 'LIVE' 
                        ? 'text-red-600 crypto-base dark:text-red-400 border-red-200 dark:border-red-800' 
                        : 'text-blue-600 crypto-base dark:text-blue-400 border-blue-200 dark:border-blue-800'
                      }
                    >
                      {t.environment}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">{formatDate(t.createdAt)}</TableCell>
                  <TableCell className="text-center">{t.lastUsedAt ? formatDate(t.lastUsedAt) : '—'}</TableCell>
                  <TableCell className="text-center">{t.requestCount}</TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteApiToken(t.id)} 
                        disabled={isDeletingApiToken}
                        className="crypto-button-ghost h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <HugeiconsIcon icon={Delete01Icon} className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {/* Pagination Controls */}
          {sortedAndPaginatedTokens.totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3">
              
              <Pagination>
                <PaginationContent >
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
                  
                  {Array.from({ length: sortedAndPaginatedTokens.totalPages }, (_, i) => i + 1).map((page) => (
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
                        if (currentPage < sortedAndPaginatedTokens.totalPages) setCurrentPage(currentPage + 1)
                      }}
                      className={currentPage === sortedAndPaginatedTokens.totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}
        </div>
      )}
    </CardContent>
    
    {/* Delete Confirmation Dialog */}
    <DeleteTokenConfirmationDialog
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
      onConfirm={confirmDeleteToken}
      isDeleting={isDeletingApiToken}
    />
  </Card>
}