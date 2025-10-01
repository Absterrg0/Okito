'use client'

import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HugeiconsIcon } from '@hugeicons/react'
import { RefreshIcon, Search01Icon } from '@hugeicons/core-free-icons'
import { ModeToggle } from '@/components/ui/theme-toggle'
import { toast } from 'sonner'
import { useSelectedProjectStore } from '@/store/projectStore'
import { useFetchEvents } from '@/hooks/event/useGetEvents'
import { useTableStateStore } from '@/store/tableStateStore'
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious,
} from "@/components/ui/pagination"
import { formatDate, getMetadataPreview, formatAmount6Decimals, getStatusClass } from './helpers'
import { EventDetailsSheet } from './EventDetailsSheet'
import { copyToClipboard } from '@/lib/helpers'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
type EventType = 'PAYMENT'

type EventItem = {
  id: string
  sessionId: string
  createdAt: string
  type: EventType
  metadata: Record<string, unknown>
  payment?: {
    status: 'PENDING' | 'CONFIRMED' | 'FAILED'
    amount: bigint
    currency: 'USDC' | 'USDT' | null
  } | null
}



const LABEL_BY_TYPE: Record<EventType, string> = {
  PAYMENT: 'payment',
}

const itemsPerPage = 50;

export default function EventsPage() {
  const { selectedProject } = useSelectedProjectStore()
  const [query, setQuery] = useState('')
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const projectId = selectedProject?.id ?? ''
  const { data:events, isLoading, error, refetch, isFetching } = useFetchEvents(projectId)
  const { eventCurrentPage: currentPage, setEventCurrentPage: setCurrentPage } = useTableStateStore()


  const normalizedQuery = query.trim().toLowerCase()
  const baseEvents: EventItem[] = events ?? []
  const filtered = normalizedQuery
    ? baseEvents.filter((event) => {
        const typeLabel = LABEL_BY_TYPE[event.type] ?? event.type
        return `${event.id} ${event.sessionId} ${typeLabel}`.toLowerCase().includes(normalizedQuery)
      })
    : baseEvents

  // Pagination
  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginated = filtered.slice(startIndex, endIndex)
  


  const refresh = async () => {
    const result = await refetch()
    if (result.data) {
      toast.success('Events refreshed')
    } else {
      toast.error('Failed to refresh events')
    }
  }
  
  
  
  if (error) {
    toast.error('Failed to load events')
  }

  const openEventId = searchParams?.get('eventId') || ''
  const setEventIdParam = (value?: string) => {
    const params = new URLSearchParams(searchParams?.toString() || '')
    if (value) {
      params.set('eventId', value)
    } else {
      params.delete('eventId')
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="min-h-screen rounded-full bg-background p-8">
      {/* Header */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">Events</h1>
          <p className="text-lg text-muted-foreground">All webhook deliveries and transaction events for your project</p>
        </div>
        <div className="gap-2 flex items-center">
          {/* <Environment /> */}
          <ModeToggle />
        </div>
      </div>

      {/* Controls */}
      <div className="mb-4 flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="relative">
            <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by event ID, session ID, or type"
              className="pl-8 crypto-input"
            />
          </div>
          <Button
            variant="outline"
            className="crypto-button"
            onClick={refresh}
            disabled={isFetching || isLoading || !selectedProject}
          >
            <HugeiconsIcon icon={RefreshIcon} className="w-4 h-4" /> 
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="crypto-base rounded-lg">
            <Table className='crypto-glass-static'>
              <TableHeader>
                <TableRow className="crypto-glass-static border-b border-zinc-100/5">
                  <TableHead className="font-semibold text-foreground crypto-input text-center">#</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input text-center">Status</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input text-center">Amount</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input text-center">Currency</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input text-center">Type</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input text-center">Time</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input text-center">Metadata</TableHead>
                  <TableHead className="w-[1%] whitespace-nowrap font-semibold text-foreground text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      Loading events...
                    </TableCell>
                  </TableRow>
                ) : error ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      Failed to load events.
                    </TableCell>
                  </TableRow>
                ) : !selectedProject ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      Select a project to view its events.
                    </TableCell>
                  </TableRow>
                ) : paginated.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-muted-foreground">
                      No events found.
                    </TableCell>
                  </TableRow>
                ) : (
                  paginated.map((e, idx) => (
                    <TableRow key={e.id} className={idx < paginated.length - 1 ? 'crypto-base' : ''}>
                      <TableCell className="whitespace-nowrap text-center">{startIndex + idx + 1}</TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline" className={`text-xs ${getStatusClass(e.payment?.status)}`}>
                          {e.payment && e.payment.status ? e.payment.status : '—'}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-mono text-xs text-center">
                        {e.payment?.amount !== undefined && e.payment?.amount !== null
                          ? formatAmount6Decimals(e.payment?.amount)
                          : '—'}
                      </TableCell>
                      <TableCell className="text-xs text-center">
                        {e.payment?.currency ?? '—'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="default" className="text-xs ">{LABEL_BY_TYPE[e.type] ?? e.type}</Badge>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-center">{formatDate(e.createdAt)}</TableCell>
                      <TableCell 
                        className="font-mono text-xs max-w-[200px] text-center"
                        title="Event metadata preview"
                      >
                        {getMetadataPreview(e.metadata)}
                      </TableCell>
                      <TableCell className="text-center">
                        <EventDetailsSheet
                          eventId={e.id}
                          onCopy={copyToClipboard}
                          open={openEventId === e.id}
                          onOpenChange={(next) => {
                            if (next) setEventIdParam(e.id)
                            else if (openEventId === e.id) setEventIdParam()
                          }}
                        />
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {startIndex + 1}–{Math.min(endIndex, filtered.length)} of {filtered.length}
              </div>
              <Pagination>
                <PaginationContent>
                    <PaginationItem>
                    <PaginationPrevious 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        if (safePage > 1) setCurrentPage(safePage - 1)
                      }}
                      className={safePage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          setCurrentPage(page)
                        }}
                        isActive={safePage === page}
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
                        if (safePage < totalPages) setCurrentPage(safePage + 1)
                      }}
                      className={safePage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          )}

      {/* Details handled via EventDetailsSheet per-row */}
    </div>
  )
}