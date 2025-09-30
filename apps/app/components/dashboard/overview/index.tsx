'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { HugeiconsIcon } from '@hugeicons/react'
import { 
  Copy01Icon, 
  Wallet01Icon, 
  BookOpen01Icon, 
  FlashIcon, 
  Link01Icon, 
  Key01Icon, 
  WebhookIcon,
  Activity01Icon,
  ArrowUp01Icon as TrendingUp01Icon,
  ArrowUpRightIcon,
  CheckmarkCircle01Icon,
  AlertCircleIcon,
  Settings01Icon,
  Globe02Icon as Globe01Icon,
  Mail01Icon,
  ChartIcon,
  PlusSignIcon,
  PlayIcon,
  Desk01Icon as MonitorIcon,
  CodeIcon,
  BeltIcon as BellIcon,
  DollarCircleIcon as CurrencyDollarIcon
} from '@hugeicons/core-free-icons'
import { useSelectedProjectStore } from '@/store/projectStore'
import { ModeToggle } from '@/components/ui/theme-toggle'
import Environment from '@/components/ui/environment'
import { useSessionContext } from '@/components/providers/session-provider'
import Loader from '@/components/ui/loader'
import { useProjectFetchDetails } from '@/hooks/projects/useProjectDetailsFetch'
import { copyToClipboard } from '@/lib/helpers'
import Link from 'next/link'
import type { ProjectDetails } from '@/types/project'

export default function OverviewPage() {
  const selectedProject = useSelectedProjectStore(s => s.selectedProject);
  const { data: project, isLoading } = useProjectFetchDetails(selectedProject?.id || '');
  const { session } = useSessionContext();

  // Calculate metrics
  const getProjectMetrics = (project: ProjectDetails) => {
    const totalRequests = (project.apiTokens ?? [])
      .reduce((sum, t) => sum + (t.requestCount ?? 0), 0);
    
    const activeApiKeys = (project.apiTokens ?? []).filter(t => t.status === 'ACTIVE').length;
    const activeWebhooks = (project.webhookEndpoints ?? []).filter(w => w.status === 'ACTIVE').length;
    
    const lastApiUse = (project.apiTokens ?? [])
      .map(t => t.lastUsedAt ? new Date(t.lastUsedAt).getTime() : 0)
      .reduce((a, b) => Math.max(a, b), 0);
    
    const lastWebhookHit = (project.webhookEndpoints ?? [])
      .map(w => w.lastTimeHit ? new Date(w.lastTimeHit).getTime() : 0)
      .reduce((a, b) => Math.max(a, b), 0);

    return {
      totalRequests,
      activeApiKeys,
      activeWebhooks,
      lastApiUse,
      lastWebhookHit,
      hasActivity: lastApiUse > 0 || lastWebhookHit > 0
    };
  };

  function WalletAddressDisplay() {
    return <>{session?.user.walletAddress?.slice(0,6)}...{session?.user.walletAddress?.slice(-6)}</>
  }

  // Enhanced stats with better visual hierarchy
  function ProjectStatsGrid({ project }: { project: ProjectDetails }) {
    const metrics = getProjectMetrics(project);
    
    const stats = [
      {
        title: "Total Requests",
        value: metrics.totalRequests.toLocaleString(),
        icon: Activity01Icon,
        color: "from-blue-500/20 to-cyan-500/20",
        iconColor: "text-blue-500"
      },
      {
        title: "Active API Keys",
        value: metrics.activeApiKeys,
        icon: Key01Icon,
        color: "from-green-500/20 to-emerald-500/20",
        iconColor: "text-green-500"
      },
      {
        title: "Active Webhooks", 
        value: metrics.activeWebhooks,
        icon: WebhookIcon,
        color: "from-purple-500/20 to-violet-500/20",
        iconColor: "text-purple-500"
      },
      {
        title: "Connected Wallet",
        value: <WalletAddressDisplay />,
        icon: Wallet01Icon,
        color: "from-orange-500/20 to-amber-500/20",
        iconColor: "text-orange-500"
      }
    ];

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="group">
            <div className={`crypto-glass-static border-0 rounded-2xl p-6 relative overflow-hidden bg-gradient-to-br ${stat.color}`}>
              
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-4">
                  <div className={`rounded-xl bg-background/10 backdrop-blur-sm ${stat.iconColor}`}>
                    <HugeiconsIcon icon={stat.icon} className="w-6 h-6" />
                  </div>
                </div>
                
                <div className="space-y-1">
                  <div className="text-3xl font-bold tracking-tight">{stat.value}</div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                  {(stat as any).subtitle && (
                    <p className="text-xs text-muted-foreground/80">{(stat as any).subtitle}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Redesigned integration status with action cards
  function IntegrationStatusSection({ project }: { project: ProjectDetails }) {
    const hasApiKeys = (project.apiTokens ?? []).length > 0;
    const hasWebhooks = (project.webhookEndpoints ?? []).length > 0;
    const hasEmails = (project as any).notificationEmails?.length > 0;
    const hasCurrencies = project.acceptedCurrencies?.length > 0;

    const integrationSteps = [
      {
        id: 'api',
        title: 'API Configuration',
        description: 'Generate secure API keys to authenticate your payment requests.\nEnable seamless integration with your application backend.',
        completed: hasApiKeys,
        icon: Key01Icon,
        action: 'Configure API',
        href: '/dashboard/settings'
      },
      {
        id: 'webhook',
        title: 'Webhook Endpoints',
        description: 'Set up real-time notifications for payment events and status updates.\nKeep your application synchronized with transaction changes.',
        completed: hasWebhooks,
        icon: WebhookIcon,
        action: 'Setup Webhooks',
        href: '/dashboard/settings'
      }
    ];

    const completedSteps = integrationSteps.filter(step => step.completed).length;
    const progressPercentage = (completedSteps / integrationSteps.length) * 100;

    return (
      <div className="space-y-8">
        {/* Show Test Integration first if 100% complete, otherwise show setup */}
        {progressPercentage === 100 ? (
          /* Quick Actions Section - Show first when complete */
          hasApiKeys && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="crypto-base p-6 rounded-xl">
              <div className="mb-4">
                <HugeiconsIcon icon={CodeIcon} className="w-8 h-8 text-blue-500 mb-3" />
                <h4 className="font-semibold mb-2">Sample Request</h4>
                <p className="text-xs text-muted-foreground">Copy a test payment request</p>
              </div>
              <Button 
                size="sm" 
                className="crypto-button w-full"
                onClick={() => {
                  const sampleRequest = JSON.stringify({
                    amount: 1000,
                    token: project.acceptedCurrencies?.[0] || 'USDC',
                    network: "mainnet-beta"
                  }, null, 2);
                  copyToClipboard(sampleRequest, 'Payment request');
                }}
              >
                <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4 mr-2" />
                Copy Request
              </Button>
            </div>

            {hasWebhooks && (
              <div className="crypto-base p-6 rounded-xl">
                <div className="mb-4">
                  <HugeiconsIcon icon={WebhookIcon} className="w-8 h-8 text-purple-500 mb-3" />
                  <h4 className="font-semibold mb-2">Test Webhook</h4>
                  <p className="text-xs text-muted-foreground">Send a test event to your endpoint</p>
                </div>
                <Button size="sm" variant="outline" className="crypto-button w-full">
                  <HugeiconsIcon icon={PlayIcon} className="w-4 h-4 mr-2" />
                  Send Test
                </Button>
              </div>
            )}

            <div className="crypto-base p-6 rounded-xl">
              <div className="mb-4">
                <HugeiconsIcon icon={Activity01Icon} className="w-8 h-8 text-green-500 mb-3" />
                <h4 className="font-semibold mb-2">View Events</h4>
                <p className="text-xs text-muted-foreground">Browse payment and transaction events</p>
              </div>
              <Button asChild size="sm" variant="outline" className="crypto-button w-full">
                <Link href="/dashboard/events">
                  <HugeiconsIcon icon={Activity01Icon} className="w-4 h-4 mr-2" />
                  View Events
                </Link>
              </Button>
            </div>

            <div className="crypto-base p-6 rounded-xl">
              <div className="mb-4">
                <HugeiconsIcon icon={ChartIcon} className="w-8 h-8 text-orange-500 mb-3" />
                <h4 className="font-semibold mb-2">View Stats</h4>
                <p className="text-xs text-muted-foreground">Check analytics and performance metrics</p>
              </div>
              <Button asChild size="sm" variant="outline" className="crypto-button w-full">
                <Link href="/dashboard/home">
                  <HugeiconsIcon icon={ChartIcon} className="w-4 h-4 mr-2" />
                  View Stats
                </Link>
              </Button>
            </div>
          </div>
          )
        ) : (
          /* Integration Setup Section - Show when not 100% complete */
          <div className="crypto-base border-0 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold mb-2">Integration Setup</h3>
                <p className="text-muted-foreground">
                  {completedSteps} of {integrationSteps.length} steps completed
                </p>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-primary mb-1">{Math.round(progressPercentage)}%</div>
                <div className="text-sm text-muted-foreground">Complete</div>
              </div>
            </div>

            {/* Integration Steps Grid */}
            <div className="grid grid-cols-1 gap-6">
              {integrationSteps.map((step) => (
                <div
                  key={step.id}
                className={`group relative p-8 rounded-xl ${
                  step.completed
                    ? 'bg-green-500/5'
                    : 'bg-background/50'
                }`}
                >
                  <div className="flex items-start gap-6">
                    <div className={`p-4 rounded-xl ${
                      step.completed 
                        ? 'bg-green-500/10 text-green-500' 
                        : 'bg-muted/20 text-muted-foreground'
                    }`}>
                      {step.completed ? (
                        <HugeiconsIcon icon={CheckmarkCircle01Icon} className="w-8 h-8" />
                      ) : (
                        <HugeiconsIcon icon={step.icon} className="w-8 h-8" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3">
                        <h4 className="font-semibold text-lg">{step.title}</h4>
                        {step.completed && (
                          <Badge variant="secondary" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
                            Complete
                          </Badge>
                        )}
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 whitespace-pre-line">
                        {step.description}
                      </p>
                      
                      {!step.completed && (
                        <Button asChild size="sm" variant="outline" className="crypto-button">
                          <Link href={step.href}>
                            {step.action}
                            <HugeiconsIcon icon={ArrowUpRightIcon} className="w-4 h-4 ml-2" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions Section - Show after setup if not 100% complete */}
        {progressPercentage !== 100 && hasApiKeys && (
          <div className="crypto-base border-0 rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <HugeiconsIcon icon={PlayIcon} className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">Access key features and test your integration</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="crypto-base p-6 rounded-xl">
                <div className="mb-4">
                  <HugeiconsIcon icon={CodeIcon} className="w-8 h-8 text-blue-500 mb-3" />
                  <h4 className="font-semibold mb-2">Sample Request</h4>
                  <p className="text-xs text-muted-foreground">Copy a test payment request</p>
                </div>
                <Button 
                  size="sm" 
                  className="crypto-button w-full"
                  onClick={() => {
                    const sampleRequest = JSON.stringify({
                      amount: 1000,
                      token: project.acceptedCurrencies?.[0] || 'USDC',
                      network: "mainnet-beta"
                    }, null, 2);
                    copyToClipboard(sampleRequest, 'Payment request');
                  }}
                >
                  <HugeiconsIcon icon={Copy01Icon} className="w-4 h-4 mr-2" />
                  Copy Request
                </Button>
              </div>

              {hasWebhooks && (
                <div className="crypto-base p-6 rounded-xl">
                  <div className="mb-4">
                    <HugeiconsIcon icon={WebhookIcon} className="w-8 h-8 text-purple-500 mb-3" />
                    <h4 className="font-semibold mb-2">Test Webhook</h4>
                    <p className="text-xs text-muted-foreground">Send a test event to your endpoint</p>
                  </div>
                  <Button size="sm" variant="outline" className="crypto-button w-full">
                    <HugeiconsIcon icon={PlayIcon} className="w-4 h-4 mr-2" />
                    Send Test
                  </Button>
                </div>
              )}

              <div className="crypto-base p-6 rounded-xl">
                <div className="mb-4">
                  <HugeiconsIcon icon={Activity01Icon} className="w-8 h-8 text-green-500 mb-3" />
                  <h4 className="font-semibold mb-2">View Events</h4>
                  <p className="text-xs text-muted-foreground">Browse payment and transaction events</p>
                </div>
                <Button asChild size="sm" variant="outline" className="crypto-button w-full">
                  <Link href="/dashboard/events">
                    <HugeiconsIcon icon={Activity01Icon} className="w-4 h-4 mr-2" />
                    View Events
                  </Link>
                </Button>
              </div>

              <div className="crypto-base p-6 rounded-xl">
                <div className="mb-4">
                  <HugeiconsIcon icon={ChartIcon} className="w-8 h-8 text-orange-500 mb-3" />
                  <h4 className="font-semibold mb-2">View Stats</h4>
                  <p className="text-xs text-muted-foreground">Check analytics and performance metrics</p>
                </div>
                <Button asChild size="sm" variant="outline" className="crypto-button w-full">
                  <Link href="/dashboard/home">
                    <HugeiconsIcon icon={ChartIcon} className="w-4 h-4 mr-2" />
                    View Stats
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Cleaner info cards
  function ProjectInfoCards({ project }: { project: ProjectDetails }) {
    return (
      <div className="space-y-6">
        {/* Currencies & Notifications */}
        <div className="crypto-base border-0 rounded-2xl p-6">
          <div className="space-y-6">
            {/* Accepted Currencies */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Accepted Currencies</h4>
                <Button asChild size="sm" variant="ghost" className="crypto-button">
                  <Link href="/dashboard/settings">
                    <HugeiconsIcon icon={Settings01Icon} className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              
              {project.acceptedCurrencies?.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {project.acceptedCurrencies.map((currency: string) => (
                    <Badge key={currency} variant="secondary" className="crypto-base">
                      {currency}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <HugeiconsIcon icon={PlusSignIcon} className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">No currencies configured</p>
                  <Button asChild size="sm" className="crypto-button">
                    <Link href="/dashboard/settings">Add Currencies</Link>
                  </Button>
                </div>
              )}
            </div>

            {/* Notification Emails */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-semibold">Notifications</h4>
                <Button asChild size="sm" variant="ghost" className="crypto-button">
                  <Link href="/dashboard/settings">
                    <HugeiconsIcon icon={Settings01Icon} className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
              
              {(project as any).notificationEmails?.length > 0 ? (
                <div className="space-y-2">
                  {(project as any).notificationEmails.map((email: string) => (
                    <div key={email} className="flex items-center gap-3 p-3 rounded-lg crypto-base">
                      <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{email}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-12 h-12 bg-muted/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <HugeiconsIcon icon={Mail01Icon} className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">No email notifications</p>
                  <Button asChild size="sm" className="crypto-button">
                    <Link href="/dashboard/settings">Add Email</Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="crypto-base border-0 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center">
              <HugeiconsIcon icon={BookOpen01Icon} className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Resources</h3>
          </div>
          
          <div className="space-y-3">
            <Button asChild variant="outline" className="w-full justify-between crypto-button">
              <a href="https://docs.okito.dev" target="_blank" rel="noreferrer">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={BookOpen01Icon} className="w-4 h-4" />
                  <span>Documentation</span>
                </div>
                <HugeiconsIcon icon={ArrowUpRightIcon} className="w-4 h-4" />
              </a>
            </Button>
            
            <Button asChild variant="outline" className="w-full justify-start crypto-button">
              <Link href="/dashboard/settings">
                <HugeiconsIcon icon={Settings01Icon} className="w-4 h-4 mr-2" />
                Project Settings
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
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
      {/* Header */}
      <div className="mb-12 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
            {project?.name || 'Project Overview'}
          </h1>
          <p className="text-lg text-muted-foreground">
            Monitor your integration progress and project metrics
          </p>
        </div>
        <div className="gap-4 flex items-center">
          {/* <Environment /> */}
          <ModeToggle />
        </div>
      </div>

      <div className="space-y-12">
        {/* Stats Grid */}
        {project && <ProjectStatsGrid project={project} />}

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main Content - Integration & Testing */}
          <div className="xl:col-span-3">
            {project && <IntegrationStatusSection project={project} />}
          </div>

          {/* Sidebar - Project Info */}
          <div className="xl:col-span-1">
            {project && <ProjectInfoCards project={project} />}
          </div>
        </div>
      </div>
    </div>
  )
}