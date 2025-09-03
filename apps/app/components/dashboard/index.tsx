'use client'
import { Badge } from "@/components/ui/badge"
import { 
  DollarSign,
  Activity,
  Coins,
  Network,
  BarChart3,
  RefreshCw,
  ExternalLink
} from "lucide-react"
import { ChartAreaGradient } from "@/components/ui/charts/area"
import { ChartBarPlans } from "@/components/ui/charts/bar"
import { ChartPieDonutText } from "@/components/ui/charts/pi"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Environment from "../ui/environment"
import { ModeToggle } from "../ui/theme-toggle"

// Solana-specific data for the dashboard
const solanaMetrics = {
  totalVolume: 15420.50,
  monthlyGrowth: 12.5,
  totalTransactions: 1247,
  activeWallets: 892,
  solVolume: 8750.30,
  usdcVolume: 6670.20,
  avgTransactionSize: 12.36,
  successRate: 98.7,
  networkFees: 0.000005,
  avgConfirmationTime: 0.4
}

const projectMetrics = {
  activeProjects: 24,
  totalWebhooks: 1567,
  webhookDeliveryRate: 99.2,
  apiCalls: 45678,
  errorRate: 0.8,
  lastDeployment: "2 hours ago",
  uptime: 99.98
}

const tokenMetrics = {
  totalTokens: 156,
  newTokensThisWeek: 12,
  totalTokenHolders: 2340,
  avgTokenPrice: 0.85,
  topPerformingToken: "OKITO",
  tokenCreationSuccess: 100
}

const recentTransactions = [
  {
    id: "tx_001",
    type: "payment_success",
    token: "SOL",
    amount: 1.5,
    user: "wallet_123...abc",
    timestamp: "2024-01-15T10:30:00Z",
    status: "confirmed",
    fee: 0.000005,
    project: "Project Alpha"
  },
  {
    id: "tx_002",
    type: "payment_success",
    token: "USDC",
    amount: 75.50,
    user: "wallet_456...def",
    timestamp: "2024-01-15T10:25:00Z",
    status: "confirmed",
    fee: 0.000005,
    project: "Project Beta"
  },
  {
    id: "tx_003",
    type: "token_created",
    token: "NEW_TOKEN",
    amount: 1000000,
    user: "wallet_789...ghi",
    timestamp: "2024-01-15T10:20:00Z",
    status: "confirmed",
    fee: 0.001,
    project: "Project Gamma"
  },
  {
    id: "tx_004",
    type: "payment_success",
    token: "SOL",
    amount: 0.25,
    user: "wallet_101...jkl",
    timestamp: "2024-01-15T10:15:00Z",
    status: "confirmed",
    fee: 0.000005,
    project: "Project Delta"
  },
  {
    id: "tx_005",
    type: "subscription_created",
    token: "USDC",
    amount: 29.99,
    user: "wallet_202...mno",
    timestamp: "2024-01-15T10:10:00Z",
    status: "active",
    fee: 0.000005,
    project: "Project Epsilon"
  }
]

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount)
}

const formatSol = (amount: number) => {
  return `${amount.toFixed(4)} SOL`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'confirmed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'failed':
      return 'bg-red-100 text-red-800'
    case 'active':
      return 'bg-blue-100 text-blue-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

const getTransactionTypeIcon = (type: string) => {
  switch (type) {
    case 'payment_success':
      return <DollarSign className="w-4 h-4" />
    case 'token_created':
      return <Coins className="w-4 h-4" />
    case 'subscription_created':
      return <RefreshCw className="w-4 h-4" />
    default:
      return <Activity className="w-4 h-4" />
  }
}

export default function DashboardPage() {
  return (
    <div className="min-h-screen rounded-full bg-background p-8">
      {/* Header */}
      <div className="mb-12 flex justify-between items-start">
       <div>
       <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
          Dashboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Monitor all the events like payments and token creations here.
        </p>
       </div>
       <div className="gap-4 flex items-center">
        <Environment></Environment>
        <ModeToggle></ModeToggle>
       </div>
      </div>

      {/* Main Charts Section */}
      <div className="space-y-12">
        {/* Top Row: Payment Volume (Full Width) + Quick Stats */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Area Chart - Takes most of the space */}
          <div className="flex-1 crypto-glass border-0 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Payment Volume Trends</h3>
              <p className="text-muted-foreground">SOL vs USDC payment volumes over time</p>
            </div>
            <div className="h-80">
              <ChartAreaGradient height={320} />
            </div>
          </div>
          
          {/* Quick Stats Cards - Right side of area chart */}
          <div className="w-full lg:w-80 space-y-6">
            <div className="crypto-glass border-0 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">Avg Transaction</h4>
                <DollarSign className="w-5 h-5 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(solanaMetrics.avgTransactionSize)}</p>
            </div>

            <div className="crypto-glass border-0 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">API Calls Today</h4>
                <Activity className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{projectMetrics.apiCalls.toLocaleString()}</p>
            </div>

            <div className="crypto-glass border-0 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">SOL Volume</h4>
                <Coins className="w-5 h-5 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{formatSol(solanaMetrics.solVolume)}</p>
            </div>

            <div className="crypto-glass border-0 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-sm font-medium text-muted-foreground">USDC Volume</h4>
                <DollarSign className="w-5 h-5 text-green-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">{formatCurrency(solanaMetrics.usdcVolume)}</p>
            </div>
          </div>
        </div>

        {/* Bottom Row: Plan Performance + Token Distribution */}
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 crypto-glass border-0 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Plan Performance</h3>
              <p className="text-muted-foreground">Subscription plan usage</p>
            </div>
            <ChartBarPlans />
          </div>
          
          <div className="flex-1 crypto-glass border-0 rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-xl font-semibold text-foreground mb-2">Token Distribution</h3>
              <p className="text-muted-foreground">Payment token preferences</p>
            </div>
            <ChartPieDonutText />
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="mt-16 crypto-glass rounded-2xl p-8">
        <div className="mb-8">
          <h3 className="text-2xl font-semibold text-foreground flex items-center mb-3">
            <div className="w-8 h-8 bg-primary/10 rounded-xl flex items-center justify-center mr-4">
              <Activity className="w-5 h-5 text-primary" />
            </div>
            Recent Transactions
          </h3>
          <p className="text-muted-foreground text-lg">
            Latest Solana transactions and token creations across your projects
          </p>
        </div>
        
        <div className="overflow-hidden rounded-xl">
          <Table>
            <TableHeader className="border-white/10">
              <TableRow>
                <TableHead className="text-white/80 font-semibold">Transaction</TableHead>
                <TableHead className="text-white/80 font-semibold">Amount</TableHead>
                <TableHead className="text-white/80 font-semibold">Wallet</TableHead>
                <TableHead className="text-white/80 font-semibold">Status</TableHead>
                <TableHead className="text-white/80 font-semibold">Time</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.map((tx, idx) => (
                <TableRow
                  key={tx.id}
                  className={`
                    transition-all duration-200
                    ${idx % 2 === 0 ? "bg-white/[0.01] dark:bg-white/[0.02]" : "bg-transparent"}
                    hover:bg-white/5
                  `}
                  style={{
                    borderBottom: "none"
                  }}
                >
                  <TableCell>
                    <div>
                      <button 
                        onClick={() => window.open(`https://solscan.io/tx/${tx.id}`, '_blank')}
                        className="font-medium text-foreground hover:text-primary transition-colors cursor-pointer text-left"
                      >
                        {tx.type === 'payment_success' && 'Payment Success'}
                        {tx.type === 'token_created' && 'Token Created'}
                        {tx.type === 'subscription_created' && 'Subscription Created'}
                      </button>
                      <div className="text-sm text-muted-foreground">
                        {tx.token}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">
                      {tx.type === 'token_created' ? `${tx.amount.toLocaleString()}` : 
                       tx.token === 'SOL' ? formatSol(tx.amount) : formatCurrency(tx.amount)}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Fee: {tx.token === 'SOL' ? formatSol(tx.fee) : formatCurrency(tx.fee)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-mono text-sm text-foreground">
                      {tx.user}
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(tx.status)}>
                      {tx.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {formatDate(tx.timestamp)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

