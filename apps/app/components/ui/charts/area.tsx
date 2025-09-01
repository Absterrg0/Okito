"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "An area chart showing USDC and USDT events"

const chartData = [
  { month: "Jan", usdc: 186, usdt: 80 },
  { month: "Feb", usdc: 305, usdt: 200 },
  { month: "Mar", usdc: 237, usdt: 120 },
  { month: "Apr", usdc: 73, usdt: 190 },
  { month: "May", usdc: 209, usdt: 130 },
  { month: "Jun", usdc: 214, usdt: 140 },
]

const chartConfig = {
  usdc: {
    label: "USDC",
    color: "var(--chart-1)",
  },
  usdt: {
    label: "USDT",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartAreaGradient({ height = 300, width = "100%" }: { height?: number; width?: string | number }) {
  return (
    <div className="space-y-4">
   
      <ChartContainer config={chartConfig} style={{ height, width }}>
        <AreaChart
          accessibilityLayer
          data={chartData}
          height={height}
          width={typeof width === "number" ? width : undefined}
          margin={{
            left: 12,
            right: 12,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            <linearGradient id="fillUsdc" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-usdc)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-usdc)"
                stopOpacity={0.1}
              />
            </linearGradient>
            <linearGradient id="fillUsdt" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="var(--color-usdt)"
                stopOpacity={0.8}
              />
              <stop
                offset="95%"
                stopColor="var(--color-usdt)"
                stopOpacity={0.1}
              />
            </linearGradient>
          </defs>
          <Area
            dataKey="usdt"
            type="natural"
            fill="url(#fillUsdt)"
            fillOpacity={0.4}
            stroke="var(--color-usdt)"
            stackId="a"
          />
          <Area
            dataKey="usdc"
            type="natural"
            fill="url(#fillUsdc)"
            fillOpacity={0.4}
            stroke="var(--color-usdc)"
            stackId="a"
          />
        </AreaChart>
      </ChartContainer>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          USDC leading by 12.3% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground flex items-center gap-2 leading-none">
          January - June 2024
        </div>
      </div>
    </div>
  )
}
