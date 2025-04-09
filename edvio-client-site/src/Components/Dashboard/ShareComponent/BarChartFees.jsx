"use client"

import { TrendingUp } from "lucide-react"
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { month: "January", sales: 10000, Percentage: 0.0 },
  { month: "February", sales: 13000, Percentage: 30.0 },
  { month: "March", sales: 7000, Percentage: -46.15 },
  { month: "April", sales: 15000, Percentage: 114.29 },
  { month: "May", sales: 10000, Percentage: -33.33 },
  { month: "June", sales: 8000, Percentage: -20.0 },
  { month: "July", sales: 16500, Percentage: 106.25 },
  { month: "August", sales: 11000, Percentage: -33.33 },
  { month: "September", sales: 6000, Percentage: -45.45 },
  { month: "October", sales: 16000, Percentage: 166.67 },
  { month: "November", sales: 10000, Percentage: -37.5 },
  { month: "December", sales: 16000, Percentage: 40.0 },
]
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/30 p-3 rounded-lg shadow-lg border border-white/20 backdrop-blur-lg text-sm">
        <p className="font-bold">{label}</p>
        {payload.map((entry, index) => {
          const isNegative = entry.name === "Sales %" && entry.value < 0
          const valueColor = isNegative ? "text-red-500" : "text-black"

          return (
            <p key={index} className={valueColor}>
              {entry.name}: {entry.value}
              {entry.name === "Sales %" ? "%" : ""}
            </p>
          )
        })}
      </div>
    )
  }
  return null
}

export function BarChartFees() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Sales and Sales %</CardTitle>
        <CardDescription>January - December 2024</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow h-0">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickFormatter={(value) => value.slice(0, 3)} />
            
            {/* Y-axis for sales */}
            <YAxis yAxisId="left" orientation="left" />
            
            {/* Y-axis for Percentage */}
            <YAxis yAxisId="right" orientation="right" />

            <Tooltip content={CustomTooltip}/>
            <Legend />

            {/* Bar for sales */}
            <Bar yAxisId="left" dataKey="sales" fill="rgb(54, 143, 139)" radius={[4, 4, 0, 0]} name="Sales" />

            {/* Bar for Percentage */}
            <Bar yAxisId="right" dataKey="Percentage" fill="rgb(112, 193, 179)" radius={[4, 4, 0, 0]} name="Sales %" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
      
    </Card>
  )
}
