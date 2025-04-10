"use client"

import * as React from "react"
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
const chartData = [
  { date: "2025-01-01", sales: 412, percent: 1.53},
  { date: "2025-01-02", sales: 390, percent: 1.45 },
  { date: "2025-01-03", sales: 528, percent: 1.96 },
  { date: "2025-01-04", sales: 601, percent: 2.23 },
  { date: "2025-01-05", sales: 713, percent: 2.65 },
  { date: "2025-01-06", sales: 474, percent: 1.76 },
  { date: "2025-01-07", sales: 356, percent: 1.32 },
  { date: "2025-01-08", sales: 698, percent: 2.59 },
  { date: "2025-01-09", sales: 822, percent: 3.04 },
  { date: "2025-01-10", sales: 500, percent: 1.85 },
  { date: "2025-01-11", sales: 635, percent: 2.35 },
  { date: "2025-01-12", sales: 288, percent: 1.07 },
  { date: "2025-01-13", sales: 357, percent: 1.33 },
  { date: "2025-01-14", sales: 849, percent: 3.12 },
  { date: "2025-01-15", sales: 912, percent: 3.35 },
  { date: "2025-01-16", sales: 777, percent: 2.85 },
  { date: "2025-01-17", sales: 690, percent: 2.53 },
  { date: "2025-01-18", sales: 308, percent: 1.13 },
  { date: "2025-01-19", sales: 247, percent: 0.92 },
  { date: "2025-01-20", sales: 333, percent: 1.24 },
  { date: "2025-01-21", sales: 554, percent: 2.07 },
  { date: "2025-01-22", sales: 799, percent: 2.99 },
  { date: "2025-01-23", sales: 481, percent: 1.80 },
  { date: "2025-01-24", sales: 409, percent: 1.52 },
  { date: "2025-01-25", sales: 670, percent: 2.48 },
  { date: "2025-01-26", sales: 725, percent: 2.68 },
  { date: "2025-01-27", sales: 918, percent: 3.39 },
  { date: "2025-01-28", sales: 856, percent: 3.16 },
  { date: "2025-01-29", sales: 789, percent: 2.91 },
  { date: "2025-01-30", sales: 602, percent: 2.22 },
  { date: "2025-01-31", sales: 731, percent: 2.69 },
  { date: "2025-02-01", sales: 407, percent: 1.50 },
  { date: "2025-02-02", sales: 369, percent: 1.36 },
  { date: "2025-02-03", sales: 622, percent: 2.29 },
  { date: "2025-02-04", sales: 895, percent: 3.29 },
  { date: "2025-02-05", sales: 716, percent: 2.63 },
  { date: "2025-02-06", sales: 398, percent: 1.46 },
  { date: "2025-02-07", sales: 840, percent: 3.09 },
  { date: "2025-02-08", sales: 982, percent: 3.61 },
  { date: "2025-02-09", sales: 1055, percent: 3.88 },
  { date: "2025-02-10", sales: 446, percent: 1.64 },
  { date: "2025-02-11", sales: 382, percent: 1.41 },
  { date: "2025-02-12", sales: 511, percent: 1.88 },
  { date: "2025-02-13", sales: 685, percent: 2.52 },
  { date: "2025-02-14", sales: 921, percent: 3.39 },
  { date: "2025-02-15", sales: 753, percent: 2.77 },
  { date: "2025-02-16", sales: 299, percent: 1.10 },
  { date: "2025-02-17", sales: 468, percent: 1.72 },
  { date: "2025-02-18", sales: 714, percent: 2.63 },
  { date: "2025-02-19", sales: 247, percent: 0.92 },
  { date: "2025-02-20", sales: 357, percent: 1.33 },
  { date: "2025-02-21", sales: 412, percent: 1.53 },
  { date: "2025-02-22", sales: 489, percent: 1.81 },
  { date: "2025-02-23", sales: 530, percent: 1.97 },
  { date: "2025-02-24", sales: 600, percent: 2.23 },
  { date: "2025-02-25", sales: 532, percent: 1.97 },
  { date: "2025-02-26", sales: 598, percent: 2.21 },
  { date: "2025-02-27", sales: 451, percent: 1.67 },
  { date: "2025-02-28", sales: 490, percent: 1.82 },
  { date: "2025-03-01", sales: 508, percent: 1.88 },
  { date: "2025-03-02", sales: 480, percent: 1.78 },
  { date: "2025-03-03", sales: 550, percent: 2.04 },
  { date: "2025-03-04", sales: 477, percent: 1.77 },
  { date: "2025-03-05", sales: 430, percent: 1.59 },
  { date: "2025-03-06", sales: 485, percent: 1.80 },
  { date: "2025-03-07", sales: 521, percent: 1.94 },
  { date: "2025-03-08", sales: 495, percent: 1.84 },
  { date: "2025-03-09", sales: 510, percent: 1.89 },
  { date: "2025-03-10", sales: 455, percent: 1.69 },
  { date: "2025-03-11", sales: 499, percent: 1.85 },
  { date: "2025-03-12", sales: 561, percent: 2.08 },
  { date: "2025-03-13", sales: 560, percent: 2.08 },
  { date: "2025-03-14", sales: 485, percent: 1.80 },
  { date: "2025-03-15", sales: 530, percent: 1.97 },
  { date: "2025-03-16", sales: 460, percent: 1.71 },
  { date: "2025-03-17", sales: 515, percent: 1.91 },
  { date: "2025-03-18", sales: 575, percent: 2.13 },
  { date: "2025-03-19", sales: 535, percent: 1.98 },
  { date: "2025-03-20", sales: 480, percent: 1.78 },
  { date: "2025-03-21", sales: 520, percent: 1.94 },
  { date: "2025-03-22", sales: 533, percent: 1.98 },
  { date: "2025-03-23", sales: 489, percent: 1.81 },
  { date: "2025-03-24", sales: 570, percent: 2.12 },
  { date: "2025-03-25", sales: 540, percent: 2.00 },
  { date: "2025-03-26", sales: 585, percent: 2.17 },
  { date: "2025-03-27", sales: 525, percent: 1.95 },
  { date: "2025-03-28", sales: 510, percent: 1.89 },
  { date: "2025-03-29", sales: 555, percent: 2.06 },
  { date: "2025-03-30", sales: 499, percent: 1.85 },
  { date: "2025-03-31", sales: 570, percent: 2.12 },
  { date: "2025-04-01", sales: 530, percent: 1.97 },
  { date: "2025-04-02", sales: 585, percent: 2.17 },
  { date: "2025-04-03", sales: 520, percent: 1.94 },
  { date: "2025-04-04", sales: 600, percent: 2.23 },
  { date: "2025-04-05", sales: 550, percent: 2.04 },
  { date: "2025-04-06", sales: 500, percent: 1.85 },
  { date: "2025-04-07", sales: 490, percent: 1.82 },
  { date: "2025-04-08", sales: 525, percent: 1.95 },

]

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  sales: {
    label: "Sales",
    color: "rgb(54, 143, 139)",
  },
  percent: {
    label: "Sales %",
    color: "rgb(112, 193, 179)",
  },
} 

export function AreaChartForShales() {
  const [timeRange, setTimeRange] = React.useState("90d")

const filteredData = chartData.filter((item) => {
  const date = new Date(item.date)
  
  // Get the current date without time to ensure proper comparison
  const referenceDate = new Date()
  referenceDate.setHours(0, 0, 0, 0) // Set to midnight to ignore the time part

  let daysToSubtract = 90
  if (timeRange === "30d") {
    daysToSubtract = 30
  } else if (timeRange === "7d") {
    daysToSubtract = 7
  }

  const startDate = new Date(referenceDate)
  startDate.setDate(startDate.getDate() - daysToSubtract)
  
  return date >= startDate
})

// Modify the filtered data by multiplying the `percent` by 100
const modifiedData = filteredData.map((item) => ({
  ...item,
  percent: item.percent * 100,
}))


const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/30 p-3 rounded-lg shadow-lg border border-white/20 backdrop-blur-lg text-sm">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => {
          // Get the corresponding config for the current entry name
          const config = chartConfig[entry.name.toLowerCase()];
          const isPercent = entry.name.toLowerCase() === "percent"; // Check for 'Sales %'
          
          const valueColor = isPercent && entry.value < 0 ? "text-red-500" : "text-black";
          
          // If it's "Sales %", divide by 100 to show the original percentage
          const valueToDisplay = isPercent ? (entry.value / 100).toFixed(2) : entry.value;
          
          return (
            <p key={index} className={valueColor}>
              {config?.label}: {valueToDisplay}{isPercent ? "%" : ""}
            </p>
          );
        })}
      </div>
    );
  }
  return null;
};


  return (
    <Card>
      <CardHeader className="flex justify-between items-center gap-2 space-y-0 table-border py-5 sm:flex-row">
      <div className=" gap-4 text-center sm:text-left p-6 bg-base-100 rounded-lg shadow-xl clip-path-triangle lg:w-[60%]">
  <CardTitle className="text-3xl font-bold mb-3">
    Sales & Sales Percentage - Interactive Chart
  </CardTitle>
  <CardDescription className="text-base opacity-[0.8]">
    This interactive chart showcases total sales and their corresponding percentage changes over time. Monitor sales performance and trends to drive better business decisions.
  </CardDescription>
</div>

        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 3 months" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="90d" className="rounded-lg">
              Last 3 months
            </SelectItem>
            <SelectItem value="30d" className="rounded-lg">
              Last 30 days
            </SelectItem>
            <SelectItem value="7d" className="rounded-lg">
              Last 7 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={modifiedData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            
            <Tooltip content={CustomTooltip}/>
            <Area
              dataKey="percent"
              type="natural"
              fill="rgb(112, 193, 179)"
              stroke="rgb(112, 193, 179)"
              stackId="a"
            />
            <Area
              dataKey="sales"
              type="natural"
              fill="rgb(54, 143, 139)"
              stroke="rgb(54, 143, 139)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
