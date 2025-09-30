'use client'

import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { CopyIcon, ArrowClockwiseIcon, MagnifyingGlassIcon, EyeIcon, GlobeIcon } from '@phosphor-icons/react'
import Environment from '@/components/ui/environment'
import { ModeToggle } from '@/components/ui/theme-toggle'
import { toast } from 'sonner'
import { useSelectedProjectStore } from '@/store/projectStore'

type EventStatus = 'delivered' | 'pending' | 'failed'
type EventType =
  | 'payment.completed'
  | 'payment.failed'
  | 'payment.pending'

type EventItem = {
  id: string
  createdAt: string
  type: EventType
  status: EventStatus
  endpointUrl: string
  requestId: string
  payload: Record<string, unknown>
  response?: { status: number; body?: unknown }
}

function formatDate(date: string | Date) {
  return new Date(date).toLocaleString(undefined, {
    year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

function randomPick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)] }

function generateMockEvents(count: number, projectId: string | undefined): EventItem[] {
  const endpoints = [
    'https://api.your-app.com/webhooks/okito',
    'https://staging.your-app.com/webhooks/okito',
    'https://hooks.example.com/okito'
  ]
  const types: EventType[] = [
    'payment.completed', 'payment.failed', 'payment.pending'
  ]
  const statuses: EventStatus[] = ['delivered', 'pending', 'failed']

  return Array.from({ length: count }).map((_, i) => {
    const type = randomPick(types)
    const status = randomPick(statuses)
    return {
      id: crypto.randomUUID(),
      createdAt: new Date(Date.now() - i * 1000 * 60).toISOString(),
      type,
      status,
      endpointUrl: randomPick(endpoints),
      requestId: `req_${Math.random().toString(36).slice(2, 10)}`,
      payload: {
        projectId,
        event: type,
        amount: Math.floor(Math.random() * 10000) + 100,
        currency: 'USDC',
        userId: `usr_${Math.random().toString(36).slice(2, 8)}`,
      },
      response: { status: status === 'delivered' ? 200 : status === 'failed' ? 500 : 202 }
    }
  })
}

export default function EventsPage() {
  const { selectedProject } = useSelectedProjectStore()

  const [allEvents, setAllEvents] = useState<EventItem[]>(() => generateMockEvents(275, selectedProject?.id))
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    return allEvents.filter(e => !query || `${e.id} ${e.type} ${e.endpointUrl} ${e.requestId}`.toLowerCase().includes(query.toLowerCase()))
  }, [allEvents, query])

  const pageSize = 50
  const [page, setPage] = useState(1)
  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize))
  const currentPage = Math.min(page, pageCount)
  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, currentPage])

  const [openId, setOpenId] = useState<string | null>(null)
  const openEvent = useMemo(() => allEvents.find(e => e.id === openId) || null, [allEvents, openId])

  const copyToClipboard = async (text: string, label: string) => {
    try { await navigator.clipboard.writeText(text); toast.success(`${label} copied`) }
    catch { toast.error('Failed to copy') }
  }

  const refresh = () => {
    setAllEvents(generateMockEvents(275, selectedProject?.id))
    toast.success('Events refreshed')
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
            <MagnifyingGlassIcon className="w-4 h-4 absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search by ID, type, endpoint, request ID"
              className="pl-8 crypto-input"
            />
          </div>
          <Button variant="outline" className="crypto-button" onClick={refresh}>
            <ArrowClockwiseIcon className="w-4 h-4 mr-2" /> Refresh
          </Button>
        </div>
      </div>

      {/* Table */}
      <Card className="crypto-glass-static border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl">Event Stream</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="crypto-base rounded-lg">
            <Table className='crypto-glass-static'>
              <TableHeader>
                <TableRow className="crypto-glass-static border-b border-zinc-100/5">
                  <TableHead className="font-semibold text-foreground crypto-input">Time</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input">Type</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input">Status</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input">Endpoint</TableHead>
                  <TableHead className="font-semibold text-foreground crypto-input">Request ID</TableHead>
                  <TableHead className="w-[1%] whitespace-nowrap text-right font-semibold text-foreground">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginated.map((e, idx) => (
                  <TableRow key={e.id} className={idx < paginated.length - 1 ? 'crypto-base' : ''}>
                    <TableCell className="whitespace-nowrap ">{formatDate(e.createdAt)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">{e.type}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={
                          e.status === 'delivered'
                            ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800'
                            : e.status === 'failed'
                            ? 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
                            : 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                        }
                      >
                        {e.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="max-w-[380px]">
                      <div className="flex items-center gap-2 min-w-0">
                        <code className="text-xs break-all">{e.endpointUrl}</code>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-xs">{e.requestId}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="crypto-button-ghost h-8 w-8 p-0"
                          onClick={() => setOpenId(e.id)}
                          title="View details"
                        >
                          <EyeIcon className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="crypto-button-ghost h-8 w-8 p-0"
                          onClick={() => copyToClipboard(JSON.stringify(e.payload, null, 2), 'Payload')}
                          title="Copy payload"
                        >
                          <CopyIcon className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filtered.length)} of {filtered.length}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="crypto-button"
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Prev
              </Button>
              <div className="text-sm">Page {currentPage} / {pageCount}</div>
              <Button
                variant="outline"
                size="sm"
                className="crypto-button"
                onClick={() => setPage(p => Math.min(pageCount, p + 1))}
                disabled={currentPage === pageCount}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Details Sheet */}
      <Sheet open={!!openId} onOpenChange={(o) => !o && setOpenId(null)}>
        <SheetContent side="right" className="w-full crypto-base sm:max-w-xl">
          <SheetHeader>
            <SheetTitle>Event Details</SheetTitle>
          </SheetHeader>
          <div className="mt-4 p-4 space-y-4">
            {openEvent && (
              <>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <div className="text-muted-foreground">Event ID</div>
                    <div className="font-mono break-all text-xs">{openEvent.id}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Created</div>
                    <div>{formatDate(openEvent.createdAt)}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Type</div>
                    <div className="font-mono text-xs">{openEvent.type}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Status</div>
                    <div>
                      <Badge variant="outline">{openEvent.status}</Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="text-sm font-medium">Endpoint</div>
                  <div className="flex items-center justify-between p-2 rounded crypto-input">
                    <code className="text-xs break-all">{openEvent.endpointUrl}</code>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="crypto-button-ghost h-8 w-8 p-0"
                      onClick={() => copyToClipboard(openEvent.endpointUrl, 'Endpoint URL')}
                    >
                      <CopyIcon className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Request Payload</div>
                  <div className="p-3 rounded crypto-input overflow-auto max-h-64">
                    <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(openEvent.payload, null, 2)}</pre>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <Button
                      variant="outline"
                      size="sm"
                      className="crypto-button"
                      onClick={() => copyToClipboard(JSON.stringify(openEvent.payload), 'Payload JSON')}
                    >
                      <CopyIcon className="w-4 h-4 mr-2" /> Copy JSON
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium">Response</div>
                  <div className="p-3 rounded crypto-input overflow-auto">
                    <pre className="text-xs whitespace-pre-wrap">{JSON.stringify(openEvent.response, null, 2)}</pre>
                  </div>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}