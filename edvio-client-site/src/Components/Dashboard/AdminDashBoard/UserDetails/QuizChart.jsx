import React from 'react'
import { motion} from "framer-motion"
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { CheckCircle } from 'react-feather'
import { Line } from 'react-chartjs-2'
export default function QuizChart({cardVariants,itemVariants,quizMarksChartConfig,studentData,formatDate}) {
  return (
    <motion.div variants={cardVariants}>
                  <Card className="bg-white/10 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden clip-path-card">
                    <CardHeader className="bg-gradient-to-r from-base-content/20 to-TealGreen/20 py-6 px-10 relative">
                      <div className="absolute top-0 right-0 w-40 h-full bg-base-content/20 clip-path-card-corner" />
                      <motion.div className="flex items-center gap-4" variants={itemVariants}>
                        <CheckCircle className="h-6 w-6 text-LightTeal" />
                        <h3 className="text-2xl font-semibold text-white">Quiz Performance</h3>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="p-10 space-y-8">
                      <div className="h-72">
                        <Line data={quizMarksChartConfig.data} options={quizMarksChartConfig.options} />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {(studentData.quizzes ?? []).map((quiz, index) => (
                          <motion.div 
                            key={index}
                            className="p-5 rounded-xl bg-gradient-to-r from-base-content/20 to-TealGreen/20 backdrop-blur-md border border-white/10"
                            variants={itemVariants}
                            whileHover={{ y: -8, scale: 1.05 }}
                          >
                            <h4 className="text-sm font-semibold text-white">{quiz.title}</h4>
                            <p className="text-xs text-gray-300 mt-2">Score: {quiz.score}%</p>
                            <p className="text-xs text-gray-400 mt-1">Date: {formatDate(quiz.date)}</p>
                          </motion.div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
  )
}
