import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import React from 'react'
import { motion} from "framer-motion"
import { GraduationCap } from 'lucide-react'
import { Pie } from 'react-chartjs-2'
import { Button } from '@/Components/ui/button'
import { Download, Edit2 } from 'react-feather'
export default function CourseChart({cardVariants,coursesChartConfig,itemVariants,InfoCard,studentData}) {
  return (
      <motion.div variants={cardVariants} >
                      <Card className="bg-white/10 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden clip-path-card">
                        <CardHeader className="bg-gradient-to-r from-base-content/20 to-TealGreen/20 py-6 px-10 relative">
                          <div className="absolute top-0 right-0 w-40 h-full bg-base-content/20 clip-path-card-corner" />
                          <motion.div className="flex items-center gap-4" variants={itemVariants}>
                            <GraduationCap className="h-6 w-6 text-LightTeal" />
                            <h3 className="text-2xl font-semibold text-white">Course Enrollment</h3>
                          </motion.div>
                        </CardHeader>
                        <CardContent className="p-10 flex flex-col md:flex-row gap-10">
                          <div className="h-72 w-full md:w-1/2">
                            <Pie data={coursesChartConfig.data} options={coursesChartConfig.options} />
                          </div>
                          <div className="w-full md:w-1/2 space-y-6">
                            <InfoCard 
                              label="Courses Enrolled" 
                              value={studentData.courses?.enrolled ?? 0} 
                              highlight 
                              variants={itemVariants} 
                            />
                            <InfoCard 
                              label="Courses Completed" 
                              value={studentData.courses?.completed ?? 0} 
                              highlight 
                              variants={itemVariants} 
                            />
                            <div className="p-5 rounded-xl bg-gradient-to-r from-TealGreen/10 to-TealGreen/10 border border-white/10">
                              <h4 className="text-sm font-semibold text-white">Completion Rate</h4>
                              <p className="text-3xl font-bold text-[#4ecdc4] mt-2">
                                {studentData.courses?.enrolled
                                  ? Math.round((studentData.courses.completed / studentData.courses.enrolled) * 100)
                                  : 0}%
                              </p>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                        {/* Actions */}
                    <motion.div 
                      className="flex justify-end gap-6 mt-10"
                      variants={cardVariants}
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          variant="outline"
                          className="flex items-center gap-3 border-base-content text-base-content hover:bg-base-content/20 px-8 py-6 rounded-xl text-lg font-semibold clip-path-button"
                        >
                          <Edit2 className="h-6 w-6 text-base-content" />
                          Edit Profile
                        </Button>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Button 
                          className="flex items-center gap-3 bg-gradient-to-r from-TealGreen to-base-content hover:from-base-content hover:to-TealGreen text-white px-8 py-6 rounded-xl text-lg font-semibold shadow-xl clip-path-button"
                        >
                          <Download className="h-6 w-6" />
                          Download Report
                        </Button>
                      </motion.div>
                    </motion.div>
                    </motion.div>
  )
}
