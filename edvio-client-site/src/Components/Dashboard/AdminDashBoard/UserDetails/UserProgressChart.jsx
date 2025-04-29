import React from 'react'
import { motion} from "framer-motion"
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { BarChart2 } from 'react-feather'
import { Bar } from 'react-chartjs-2'
import { Progress } from "@/components/ui/progress"
export default function UserProgressChart({cardVariants,progressChartConfig,itemVariants,studentData,InfoCard}) {
  return (
    <motion.div variants={cardVariants}>
                  <Card className="bg-white/10 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden clip-path-card">
                    <CardHeader className="bg-gradient-to-r from-base-content/20 to-TealGreen/20 py-6 px-10 relative">
                      <div className="absolute top-0 right-0 w-40 h-full bg-base-content/20 clip-path-card-corner" />
                      <motion.div className="flex items-center gap-4" variants={itemVariants}>
                        <BarChart2 className="h-6 w-6 text-LightTeal" />
                        <h3 className="text-2xl font-semibold text-white">Academic Progress</h3>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                      <div className="h-72">
                        <Bar data={progressChartConfig.data} options={progressChartConfig.options} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-300 mb-3">
                          Course Completion: {studentData.progress?.courseCompletion ?? 0}%
                        </h4>
                        <Progress 
                          value={studentData.progress?.courseCompletion ?? 0} 
                          className="h-3 bg-white/20"
                          indicatorClassName="bg-gradient-to-r from-to-[#4ecdc4]"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <InfoCard 
                          label="Skills Acquired" 
                          value={studentData.progress?.skills?.join(", ") ?? "N/A"} 
                          highlight 
                          variants={itemVariants} 
                        />
                        <InfoCard 
                          label="Certificates Earned" 
                          value={studentData.progress?.certificates ?? 0} 
                          highlight 
                          variants={itemVariants} 
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
  )
}
