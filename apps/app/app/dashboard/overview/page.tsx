'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Copy, Wallet, Key, Webhook, Building2, Eye, EyeOff, Plus, RotateCcw, Trash2, Shield, Pause, Play, ExternalLink, BookOpen, Code2, Zap, Globe } from 'lucide-react'
import { toast } from 'sonner'
import { useState } from 'react'
import { useSelectedProjectStore } from '@/store/projectStore'
import { ModeToggle } from '@/components/ui/theme-toggle'
import Environment from '@/components/ui/environment'
import { useSessionContext } from '@/components/providers/session-provider'
import {useForm} from '@tanstack/react-form'
import Loader from '@/components/ui/loader'
import { useProjectFetchDetails } from '@/hooks/projects/useProjectDetailsFetch'
import { useApiTokenMutation } from '@/hooks/apiToken/useApiTokenMutation'
import { useWebhookMutation } from '@/hooks/webhook/useWebhookMutation'
import { z } from 'zod'





type TokenType = 'production' | 'development'
type TokenItem = {
  id: string
  label: string
  type: TokenType
  createdAt: string
  lastUsedAt?: string
  key: string
}

type WebhookItem = {
  id: string
  url: string
  description?: string
  status: 'active' | 'paused'
  secret: string
  createdAt: string
}


const webhookFormSchema = z.object({
  url:z
  .string()
  .min(1,'URL is required')
  .refine((url)=>{
    try{
      const parsed = new URL(url)
      return ['http','https'].includes(parsed.protocol)
    }
    catch{
      return false;
    }
  },'Invalid URL format'),
  description:z.string().max(100,'Description must be less than 100 characters').or(z.literal(''))
})

export default function OverviewPage() {
  const selectedProject = useSelectedProjectStore(s => s.selectedProject);
  
  // Only call the hook when we have a valid project ID
  const { data: projects, isLoading } = useProjectFetchDetails(
    selectedProject?.id
  );
  // State for newly created API token dialog
  const [newlyCreatedToken, setNewlyCreatedToken] = useState<string | null>(null);
  const [showTokenDialog, setShowTokenDialog] = useState(false);

  const {mutate:createApiToken,isPending:isCreatingApiToken} = useApiTokenMutation(selectedProject?.id)
  const {mutate:createWebhook,isPending:isCreatingWebhook} = useWebhookMutation(selectedProject?.id)
  const [tokens, setTokens] = useState<TokenItem[]>([])
  const [newlyCreatedTokenId, setNewlyCreatedTokenId] = useState<string | null>(null)


  const webhookForm = useForm({
    defaultValues:{
      url:"",
      description:''
    },
    validators:{
      onChange: webhookFormSchema,
      onChangeAsyncDebounceMs:500
    },
    onSubmit: async ({value})=>{
      try{
        await handleCreateWebhook(value.url,value.description)
      }
      catch{
        toast.error("Failed to create webhook. Please try again.")
      }
    }
  })

  const [webhooks, setWebhooks] = useState<WebhookItem[]>([])
  const [isCreateOpen, setIsCreateOpen] = useState(false)

  const closeCreatePopover = () => {
    setIsCreateOpen(false)
    setTimeout(()=>{
      webhookForm.reset()
    },200)
  }

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success(`${label} copied to clipboard`)
    } catch (error) {
      toast.error('Failed to copy to clipboard')
    }
  }

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  }

  const truncateAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const handleCreateApiToken = async (environment: 'test' | 'live')=>{
    createApiToken(environment,{
      onSuccess:(data) => {
        setNewlyCreatedToken(data.apiToken.rawToken);
        setShowTokenDialog(true);
      }
    });
      
  }


  const handleCreateWebhook = async(url:string,description:string) =>{
    createWebhook({url,description},{
  
    });
  }

 

  function WalletAddressDisplay() {
    const {session} = useSessionContext();
    return <>{session?.user.walletAddress ? `${session.user.walletAddress.toString().slice(0, 6)}...${session.user.walletAddress.toString().slice(-6)}` : 'Not connected'}</>
  }

  function CopyWalletButton() {
    const {session} = useSessionContext();
    return (
      <Button
        variant="ghost"
        size="sm"
        className="h-8 px-2 crypto-button-ghost"
        disabled={!session?.user.walletAddress}
        onClick={() => session?.user.walletAddress && copyToClipboard(session.user.walletAddress, 'Wallet address')}
      >
        <Copy className="w-4 h-4" />
      </Button>
    )
  }


  const handleRemoveWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id))
    toast.success('Webhook endpoint removed')
  }

  const toggleWebhookStatus = (id: string) => {
    setWebhooks(prev => prev.map(w => w.id === id ? { ...w, status: w.status === 'active' ? 'paused' : 'active' } : w))
    const webhook = webhooks.find(w => w.id === id)
    toast.success(`Webhook ${webhook?.status === 'active' ? 'paused' : 'activated'}`)
  }





  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen rounded-full bg-background p-8">
      {/* Header (match Dashboard) */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            {projects?.name}
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your project's tokens and webhook endpoints
          </p>
        </div>
        <div className="gap-4 flex items-center">
          <Environment />
          <ModeToggle />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="mt-12 mb-4 grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-lg crypto-glass-static border-0 text-center">
            <div className="text-2xl font-bold text-primary">{tokens.length}</div>
            <div className="text-sm text-muted-foreground">API Tokens</div>
          </div>
          <div className="p-4 rounded-lg crypto-glass-static border-0 text-center">
            <div className="text-2xl font-bold text-primary">{webhooks.length}</div>
            <div className="text-sm text-muted-foreground">Webhooks</div>
          </div>
          <div className="p-4 rounded-lg crypto-glass-static border-0 text-center">
            <div className="text-2xl font-bold text-primary">{webhooks.filter(w => w.status === 'active').length}</div>
            <div className="text-sm text-muted-foreground">Active Endpoints</div>
          </div>
          <div className="p-4 rounded-lg crypto-glass-static border-0 text-center">
            <div className="text-2xl font-bold text-primary">—</div>
            <div className="text-sm text-muted-foreground">Events Today</div>
          </div>
        </div>

      {/* Main Content Grid */}
      <div className="space-y-8 grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Left Column - Main content */}
        <div className="xl:col-span-3 space-y-8">
          
          {/* API Tokens Section */}
          <Card className="crypto-glass-static border-0">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <Key className="w-6 h-6 text-primary" />
                  API Tokens
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button size="sm" className="crypto-button" onClick={() =>handleCreateApiToken('test')  }>
                    {isCreatingApiToken ? <Loader size={0.1} className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Development
                  </Button>
                  <Button size="sm" variant="outline" className="crypto-button" onClick={() =>handleCreateApiToken('live')}>
                    {isCreatingApiToken ? <Loader size={0.1} className="w-4 h-4 mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                    Production
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Secure API tokens for authenticating your requests. Keep your production tokens safe and never expose them publicly.
              </p>
            </CardHeader>
            <CardContent>
              {tokens.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="p-4 rounded-full crypto-base">
                    <Key className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">No API tokens yet</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Create your first API token to start integrating with our services. You can create separate tokens for development and production environments.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="crypto-base rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-border/50">
                        <TableHead className="font-semibold text-foreground">Label</TableHead>
                        <TableHead className="font-semibold text-foreground">Type</TableHead>
                        <TableHead className="font-semibold text-foreground">Created</TableHead>
                        <TableHead className="font-semibold text-foreground">Last used</TableHead>
                        <TableHead className="w-[1%] whitespace-nowrap text-right font-semibold text-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tokens.map((t, index) => (
                        <TableRow key={t.id} className={index < tokens.length - 1 ? 'border-b border-border/20' : ''}>
                          <TableCell className="font-medium">{t.label}</TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={t.type === 'production' 
                                ? 'text-red-600 dark:text-red-400 border-red-200 dark:border-red-800' 
                                : 'text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800'
                              }
                            >
                              {t.type}
                            </Badge>
                          </TableCell>
                          <TableCell>{formatDate(t.createdAt)}</TableCell>
                          <TableCell>{t.lastUsedAt ? formatDate(t.lastUsedAt) : '—'}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => setNewlyCreatedTokenId(prev => prev === t.id ? null : t.id)} 
                                className="crypto-button-ghost h-8 w-8 p-0"
                              >
                                {newlyCreatedTokenId === t.id ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(t.key, 'API token')} 
                                className="crypto-button-ghost h-8 w-8 p-0"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() =>{}} 
                                className="crypto-button-ghost h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Enhanced Webhooks Section */}
          <Card className="crypto-glass-static border-0">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <CardTitle className="flex items-center gap-3 text-xl">
                    <Webhook className="w-6 h-6 text-primary" />
                    Webhook Endpoints
                  </CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Configure webhook endpoints to receive real-time event notifications from our platform
                  </p>
                </div>
          <Popover open={isCreateOpen} onOpenChange={(open) => {
  if (!open) {
    closeCreatePopover()
  } else {
    setIsCreateOpen(true)
  }
}}>

                  <PopoverTrigger asChild>
                    <Button className="crypto-button" size="sm">
                      <Plus className="w-4 h-4 mr-2" /> Add
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[480px] p-0 crypto-base border-0" align="end" side="bottom">
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
                            </>
                          )}
                        />
                      </div>
                  
                      <div className="flex justify-end gap-2 pt-2">
                       
                        <Button
                          type="submit"
                          className="crypto-button"
                          size="sm"
                          disabled={isCreatingWebhook || !webhookForm.state.canSubmit}
                        >
                          {isCreatingWebhook ? (
                            <Loader size={0.1} className="w-4 h-4 mr-2" />
                          ) : (
                            <Plus className="w-4 h-4 mr-2" />
                          )}
                          Create Webhook
                        </Button>
                      </div>
                    </form>
                  </PopoverContent>
                </Popover>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <Separator />

              {/* Webhook List */}
              {webhooks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center gap-4">
                  <div className="p-4 rounded-full crypto-base">
                    <Webhook className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-medium">No webhook endpoints configured</h3>
                    <p className="text-sm text-muted-foreground max-w-md">
                      Webhook endpoints allow your application to receive real-time notifications when events occur. Create your first endpoint above to get started.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="crypto-base rounded-lg">
                  <div className="flex items-center justify-between p-4 pb-0">
                    <h3 className="font-medium text-lg">Configured Endpoints ({webhooks.length})</h3>
                    <Badge variant="outline" className="text-green-600 dark:text-green-400">
                      {webhooks.filter(w => w.status === 'active').length} Active
                    </Badge>
                  </div>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-b border-border/50">
                        <TableHead className="font-semibold text-foreground">URL</TableHead>
                        <TableHead className="font-semibold text-foreground">Status</TableHead>
                        <TableHead className="font-semibold text-foreground">Description</TableHead>
                        <TableHead className="font-semibold text-foreground">Created</TableHead>
                        <TableHead className="font-semibold text-foreground">Secret</TableHead>
                        <TableHead className="w-[1%] whitespace-nowrap text-right font-semibold text-foreground">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {webhooks.map((w, index) => (
                        <TableRow key={w.id} className={index < webhooks.length - 1 ? 'border-b border-border/20' : ''}>
                          <TableCell className="max-w-[360px]">
                            <div className="flex items-center gap-2 min-w-0">
                              <Globe className="w-4 h-4 text-primary shrink-0" />
                              <code className="text-xs break-all">{w.url}</code>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge 
                              variant="outline" 
                              className={w.status === 'active' 
                                ? 'text-green-600 dark:text-green-400 border-green-200 dark:border-green-800' 
                                : 'text-yellow-600 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800'
                              }
                            >
                              {w.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-[280px] truncate">{w.description || '—'}</TableCell>
                          <TableCell>{formatDate(w.createdAt)}</TableCell>
                          <TableCell>
                            <div className="font-mono text-xs p-2 rounded crypto-input">
                              {w.secret}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => toggleWebhookStatus(w.id)} 
                                className="crypto-button-ghost h-8 w-8 p-0"
                              >
                                {w.status === 'active' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(w.url, 'Webhook URL')} 
                                className="crypto-button-ghost h-8 w-8 p-0"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() => copyToClipboard(w.secret, 'Webhook secret')} 
                                className="crypto-button-ghost h-8 w-8 p-0"
                              >
                                <Shield className="w-4 h-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={() =>{}} 
                                className="crypto-button-ghost h-8 w-8 p-0 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 xl:sticky xl:top-6 self-start">
          
          {/* Wallet Status */}
          <Card className="crypto-glass-static border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Wallet className="w-5 h-5 text-primary" />
                Wallet Connected
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="p-3 rounded-lg crypto-base flex items-center justify-between">
                  <code className="text-sm font-medium">
                    <WalletAddressDisplay />
                  </code>
                  <CopyWalletButton />
                </div>
              </div>
              
              
            </CardContent>
          </Card>

          {/* Enhanced Developer Resources */}
          <Card className="crypto-glass-static border-0">
            <CardContent className="space-y-4">
              
           

           
              {/* Quick Start */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-primary" />
                  <h4 className="font-medium">Quick Start</h4>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="p-3 rounded-lg crypto-base space-y-2">
                    <div className="text-xs text-muted-foreground">Demo CURL Request</div>
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs block overflow-hidden text-muted-foreground">
                        {`curl -X POST https://api.okito.dev/payments -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d '{"amount":1000,"currency":"USDC"}'`}
                      </code>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="crypto-button-ghost h-6 w-6 p-0 shrink-0" 
                        onClick={() => copyToClipboard(`curl -X POST https://api.okito.dev/payments -H "Authorization: Bearer YOUR_TOKEN" -H "Content-Type: application/json" -d '{"amount":1000,"currency":"USDC"}'`, 'CURL command')}
                      >
                        <Copy className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Documentation */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-primary" />
                  <h4 className="font-medium">Documentation</h4>
                </div>
                <div className="p-3 rounded-lg crypto-base flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Full API reference</span>
                  <Button asChild variant="default" size="sm" className="crypto-button">
                    <a href="https://docs.okito.dev" target="_blank" rel="noreferrer">
                      Open Docs
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* API Token Display Dialog */}
      {showTokenDialog && newlyCreatedToken && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-background border border-border rounded-lg p-6 max-w-md w-full mx-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-foreground">API Token Created Successfully</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowTokenDialog(false)}
                  className="h-8 w-8 p-0"
                >
                  ×
                </Button>
              </div>
              
              <div>
                <label className="text-sm font-medium text-muted-foreground">API Token</label>
                <div className="mt-1 p-3 bg-muted rounded text-sm font-mono break-all">
                  {newlyCreatedToken}
                </div>
              </div>

              {/* Warning Message */}
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="text-yellow-600 dark:text-yellow-400 mt-0.5">
                    <Shield className="w-5 h-5" />
                  </div>
                  <div className="text-sm text-yellow-800 dark:text-yellow-200">
                    <p className="font-medium mb-1">Important Security Notice</p>
                    <p>This API token will only be displayed once. Please copy and store it securely - you will not be able to retrieve it again after closing this dialog.</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    copyToClipboard(newlyCreatedToken, 'API token');
                  }}
                  className="flex-1"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Token
                </Button>
                <Button
                  onClick={() => setShowTokenDialog(false)}
                  className="flex-1"
                >
                  I've Stored It
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}