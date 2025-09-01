"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A donut chart showing USDC vs USDT distribution"

const chartData = [
  { token: "USDC", volume: 275, fill: "var(--color-usdc)" },
  { token: "USDT", volume: 200, fill: "var(--color-usdt)" },
]

const chartConfig = {
  volume: {
    label: "Volume",
  },
  usdc: {
    label: "USDC",
    color: "var(--chart-1)",
  },
  usdt: {
    label: "USDT",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

export function ChartPieDonutText() {
  const totalVolume = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.volume, 0)
  }, [])

  const usdcPercentage = React.useMemo(() => {
    return Math.round((chartData[0].volume / totalVolume) * 100)
  }, [totalVolume])

  const usdtPercentage = React.useMemo(() => {
    return Math.round((chartData[1].volume / totalVolume) * 100)
  }, [totalVolume])

  return (
    <div className="space-y-4">
   
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square max-h-[350px]"
      >
        <PieChart>
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent hideLabel />}
          />
          <Pie
            data={chartData}
            dataKey="volume"
            nameKey="token"
            innerRadius={60}
            strokeWidth={5}
          >
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-2xl font-bold"
                      >
                        {totalVolume.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 20}
                        className="fill-muted-foreground text-sm"
                      >
                        Total Volume
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          USDC: {usdcPercentage}% | USDT: {usdtPercentage}% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Volume distribution over the last 30 days
        </div>
      </div>
    </div>
  )
}
