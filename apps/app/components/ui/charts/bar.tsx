"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart showing plan performance"

const chartData = [
  { plan: "Basic", revenue: 1250, transactions: 45 },
  { plan: "Pro", revenue: 3200, transactions: 78 },
  { plan: "Enterprise", revenue: 8900, transactions: 156 },
  { plan: "Custom", revenue: 2100, transactions: 32 },
]

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  transactions: {
    label: "Transactions",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartBarPlans() {
  return (
    <div className="space-y-4">

      <ChartContainer config={chartConfig}>
        <BarChart
          data={chartData}
          margin={{
            left: 12,
            right: 12,
          }}
          height={200}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="plan"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => `$${value}`}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="transactions"
            fill="var(--color-transactions)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Enterprise plan leading by 45% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          Last 30 days performance
        </div>
      </div>
    </div>
  )
}
