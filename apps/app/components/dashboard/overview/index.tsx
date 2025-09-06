'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
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
import { useWebhookMutation } from '@/hooks/webhook/useWebhookMutation'
import { z } from 'zod'
import { copyToClipboard } from '@/lib/helpers'
import { ApiTokenDialog } from './api-token-dialog'
import { formatDate } from '@/lib/helpers'
import ApiTokenCreation from './api-token-component'
import WebhookCreation from './webhook-component'






export default function OverviewPage() {
  const selectedProject = useSelectedProjectStore(s => s.selectedProject);
  const { data: project, isLoading } = useProjectFetchDetails(selectedProject?.id);
  const [newlyCreatedToken, setNewlyCreatedToken] = useState<string | null>(null);
  const [showTokenDialog, setShowTokenDialog] = useState(false);
  const {mutate:createWebhook,isPending:isCreatingWebhook} = useWebhookMutation(selectedProject?.id)
  const [isCreateOpen, setIsCreateOpen] = useState(false)


 


  const closeCreatePopover = () => {
    setIsCreateOpen(false)
  
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
            {project?.name}
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
            <div className="text-2xl font-bold text-primary">{project?.apiTokens.length}</div>
            <div className="text-sm text-muted-foreground">API Tokens</div>
          </div>
          <div className="p-4 rounded-lg crypto-glass-static border-0 text-center">
            <div className="text-2xl font-bold text-primary">{project?.webhookEndpoints.length}</div>
            <div className="text-sm text-muted-foreground">Webhooks</div>
          </div>
          <div className="p-4 rounded-lg crypto-glass-static border-0 text-center">
            <div className="text-2xl font-bold text-primary">{project?.webhookEndpoints.filter(w => w.status === 'ACTIVE').length}</div>
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
          {project && <ApiTokenCreation project={project} setShowTokenDialog={setShowTokenDialog} setNewlyCreatedToken={setNewlyCreatedToken}></ApiTokenCreation>}

          {project && <WebhookCreation project={project}></WebhookCreation>}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 xl:sticky xl:top-6 self-start">
          
          {/* Wallet Status */}
          <Card className="crypto-glass-static border-0">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-lg">
                <Wallet className="w-5 h-5 text-primary" />
                 Locked Wallet 
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


      <ApiTokenDialog
  open={showTokenDialog}
  onOpenChange={setShowTokenDialog}
  token={newlyCreatedToken}
  ></ApiTokenDialog>

    </div>
  )
}