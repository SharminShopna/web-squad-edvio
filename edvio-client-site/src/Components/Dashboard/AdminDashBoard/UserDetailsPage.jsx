
import useAxiosSecure from '@/Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { 
  Globe, Github, Linkedin, FileText, Smartphone, Mail, 
  MapPin, Calendar} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement, 
  Title, 
  Tooltip as ChartTooltip, 
  Legend, 
  Filler 
} from 'chart.js'
import DashboardFooter from '../ShareComponent/DashboardFooter'
import Heading from './UserDetails/Heading'
import UserProgressChart from './UserDetails/UserProgressChart'
import QuizChart from './UserDetails/QuizChart'
import CourseChart from './UserDetails/CourseChart'
import UserBasicInfo from './UserDetails/UserBasicInfo'

ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  LineElement, 
  PointElement, 
  ArcElement, 
  Title, 
  ChartTooltip, 
  Legend, 
  Filler
)

// Sample JSON data structure for charts
const chartData = {
  progress: {
    courseCompletion: 75,
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
    certificates: 3
  },
  quizzes: [
    { title: "Intro to React", score: 85, date: "2023-05-15" },
    { title: "Advanced JS", score: 92, date: "2023-06-20" },
    { title: "Database Design", score: 78, date: "2023-07-10" }
  ],
  exams: [
    { title: "Midterm Exam", score: 88, date: "2023-06-30" },
    { title: "Final Exam", score: 91, date: "2023-08-15" }
  ],
  courses: {
    enrolled: 8,
    completed: 5
  },
  payments: [
    { amount: 199, date: "2023-04-01" },
    { amount: 149, date: "2023-05-01" },
    { amount: 99, date: "2023-06-01" }
  ],
  instructor: {
    name: "Dr. Sarah Johnson",
    rating: 4.7
  }
}

export default function UserDetailsPage() {
  const axiosSecure = useAxiosSecure()
  const { id } = useParams()
  const { data: user = {}, isLoading, isError, error } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/byId/${id}`)
      return {
        ...data.data,
        ...chartData,
      }
    
    }
  })
  console.log(user)
  const studentData = isLoading || isError ? {
    name: "Loading...",
    image: "",
    education: {},
    address: {},
    additional: {},
    links: {},
    progress: chartData.progress,
    quizzes: chartData.quizzes,
    exams: chartData.exams,
    courses: chartData.courses,
    payments: chartData.payments,
    instructor: chartData.instructor
  } : user
  const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    })
  }

  const progressChartConfig = {
    data: {
      labels: ['Course Completion', 'Skills Acquired', 'Certificates'],
      datasets: [{
        label: 'Progress Metrics',
        data: [
          studentData.progress?.courseCompletion ?? 0,
          studentData.progress?.skills?.length ?? 0,
          studentData.progress?.certificates ?? 0
        ],
        backgroundColor: [' rgb(54, 143, 139)', 'rgb(112, 193, 179)', ' rgb(131, 197, 190)'],
        borderColor: [' rgb(54, 143, 139)', '#3eb7a4', '#2597b1'],
        borderWidth: 2,
        borderRadius: 8
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: ' rgb(54, 143, 139)', borderRadius: 8, padding: 12 }
      },
      scales: {
        y: { beginAtZero: true, grid: { color: ' rgb(54, 143, 139)' } },
        x: { grid: { display: false } }
      }
    }
  }

  const quizMarksChartConfig = {
    data: {
      labels: studentData.quizzes?.map(quiz => quiz.title) ?? [],
      datasets: [{
        label: 'Quiz Scores',
        data: studentData.quizzes?.map(quiz => quiz.score) ?? [],
        fill: true,
        backgroundColor: ' rgba(54, 143, 139,0.1)',
        borderColor: ' rgb(54, 143, 139)',
        tension: 0.4,
        pointBackgroundColor: ' rgb(54, 143, 139)',
        pointBorderColor: '#fff',
        pointRadius: 6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: { backgroundColor: '#1a1a2e', borderRadius: 8 }
      },
      scales: {
        y: { beginAtZero: true, max: 100, grid: { color: 'rgba(255,255,255,0.1)' } },
        x: { grid: { display: false } }
      }
    }
  }

  const coursesChartConfig = {
    data: {
      labels: ['Enrolled', 'Completed'],
      datasets: [{
        data: [
          studentData.courses?.enrolled ?? 0,
          studentData.courses?.completed ?? 0
        ],
        backgroundColor: [' rgb(54, 143, 139)', 'rgb(131, 197, 190)'],
        borderColor: ['rgb(112, 193, 179)', 'rgb(112, 193, 179)'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { 
          position: 'bottom',
          labels: { color: '#fff', font: { size: 14 } }
        },
        tooltip: { backgroundColor: '#1a1a2e', borderRadius: 8 }
      }
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.5 }
    }
  }

  const cardVariants = {
    hidden: { y: 60, opacity: 0, rotateX: 10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 }
    },
    hover: {
      y: -12,
      scale: 1.03,
      rotateY: 5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
      transition: { duration: 0.4 }
    }
  }

  const clipPathVariants = {
    hidden: { clipPath: 'circle(0% at 50% 50%)' },
    visible: {
      clipPath: 'circle(100% at 50% 50%)',
      transition: { duration: 1, ease: [0.68, -0.55, 0.265, 1.55] }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { type: "spring", stiffness: 120, damping: 15 }
      
    }
  }
 const userHeading = {
    "heading": " Performance Dashboard",
    "subHeading": "Explore detailed information about this person, including their role, current activity status, academic performance and contact details. Stay connected and manage interactions seamlessly to foster a smooth and engaging experience on the platform."
 }
  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#1a1a2e] to-[#16213e]">
        <Card className="p-8 bg-white/10 backdrop-blur-xl border-none shadow-2xl">
          <h2 className="text-2xl font-bold text-red-400">Error</h2>
          <p className="mt-3 text-gray-300">Failed to load user data: {error?.message || "Unknown error"}</p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-6 px-6 relative overflow-hidden">
      {/* Decorative background elements */}
      <motion.div 
        className="absolute top-0 left-0 w-1/3 h-1/2 bg-gradient-to-br from-[#ff6b6b]/20 to-[#4ecdc4]/20 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1, 1], opacity: [0.5, 0.7, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-0 right-0 w-1/2 h-1/3 bg-gradient-to-br from-[#45b7d1]/20 to-[#ff6b6b]/20 rounded-full blur-3xl z-0"
        animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      <AnimatePresence>
        {isLoading ? (
          <div className="mx-auto grid grid-cols-1 lg:grid-cols-3">
            <Skeleton className="h-[600px] w-full rounded-2xl bg-white/10" />
            <div className="lg:col-span-2 space-y-10">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-52 w-full rounded-2xl bg-white/10" />
              ))}
            </div>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="h-full mx-auto relative z-10"
          >
            {/* Header with animated reveal */}
          <Heading clipPathVariants={clipPathVariants} studentData={studentData} userHeading={userHeading} itemVariants={itemVariants}></Heading>

            <div className={`grid grid-cols-1 lg:grid-cols-3 gap-6 ${user?.role !== "student" && "mb-5"}`}>
              {/* Profile Card with glassmorphism */}
          <Card className="h-full bg-white/10 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden relative group clip-path-card">
                  <motion.div 
                    className="h-48 bg-gradient-to-r from-neutral to-base-content relative"
                    variants={clipPathVariants}
                  >
                    <div className="absolute inset-0 clip-path-profile-header" />
                    <motion.div
                      className="absolute -bottom-20 left-1/2 -translate-x-1/2"
                      initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
                      animate={{ scale: 1, opacity: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
                    >
                      <Avatar className="w-36 h-36 border-6 border-white/30 shadow-2xl group-hover:scale-105 transition-transform duration-300 relative">
  {studentData.image ? (
    <>
      <img 
        src={studentData.image} 
        alt={studentData.name} 
        className="object-cover w-full h-full"
        onError={(e) => {
          e.currentTarget.style.display = 'none';
          e.currentTarget.nextElementSibling.style.display = 'flex';
        }}
      />
      <div 
        className="w-full h-full bg-gradient-to-br from-TealGreen to-neutral flex items-center justify-center text-5xl font-bold text-white absolute inset-0 hidden"
      >
        {studentData.name?.charAt(0).toUpperCase()}
      </div>
    </>
  ) : (
    <div className="w-full h-full bg-gradient-to-br from-TealGreen to-neutral flex items-center justify-center text-5xl font-bold text-white">
      {studentData.name?.charAt(0).toUpperCase()}
    </div>
  )}
</Avatar>
                    </motion.div>
                  </motion.div>

                  <CardHeader className="pt-28 text-center px-10">
                    <motion.h2 
                      className="text-3xl font-bold text-base-content mb-3"
                      variants={itemVariants}
                    >
                      {studentData.name}
                    </motion.h2>
                    <motion.p 
                      className="text-[#4ecdc4] font-semibold text-lg"
                      variants={itemVariants}
                    >
                      {studentData.education?.degreeTitle || "N/A"}
                    </motion.p>
                    <motion.p 
                      className="text-gray-300 text-sm"
                      variants={itemVariants}
                    >
                      {studentData.education?.institutionName || "N/A"}
                    </motion.p>
                  </CardHeader>

                  <CardContent className="space-y-6 px-10">
                    <ContactInfo 
                      icon={<Mail className="h-5 w-5 text-TealGreen" />}
                      value={studentData.email}
                      isLink={true}
                      href={`mailto:${studentData.email}`}
                      variants={itemVariants}
                    
                    />
                    <ContactInfo 
                      icon={<Smartphone className="h-5 w-5 text-TealGreen" />}
                      value={studentData.mobile}
                      variants={itemVariants}
                    />
                    <ContactInfo 
                      icon={<MapPin className="h-5 w-5 text-TealGreen" />}
                      value={studentData.address?.presentAddress?.city 
                        ? `${studentData.address.presentAddress.city}, ${studentData.address.presentAddress.country}`
                        : "N/A"}
                      variants={itemVariants}
                    />
                    <ContactInfo 
                      icon={<Calendar className="h-5 w-5 text-TealGreen" />}
                      value={`Joined ${formatDate(studentData.date)}`}
                      variants={itemVariants}
                    />
                  </CardContent>

                  <CardFooter className="flex justify-center gap-6 pb-10 pt-6">
                    {studentData.links?.githubProfile && (
                      <SocialIcon 
                        href={studentData.links.githubProfile}
                        icon={<Github className="h-6 w-6 text-black" />}
                        tooltip="GitHub Profile"
                      />
                    )}
                    {studentData.links?.linkedinProfile && (
                      <SocialIcon 
                        href={studentData.links.linkedinProfile}
                        icon={<Linkedin className="h-6 w-6 text-blue-400" />}
                        tooltip="LinkedIn Profile"
                      />
                    )}
                    {studentData.links?.portfolioLink && (
                      <SocialIcon 
                        href={studentData.links.portfolioLink}
                        icon={<Globe className="h-6 w-6 text-blue-800" />}
                        tooltip="Portfolio Website"
                      />
                    )}
                    {studentData.links?.cvLink && (
                      <SocialIcon 
                        href={studentData.links.cvLink}
                        icon={<FileText className="h-6 w-6 text-white" />}
                        tooltip="View CV"
                      />
                    )}
                  </CardFooter>
              </Card>



              <div className='col-span-2'>
                <UserBasicInfo cardVariants={cardVariants} itemVariants={itemVariants} studentData={studentData} DetailItem={DetailItem}></UserBasicInfo>

              </div>

              {/* Details Column */}
              
            </div>
            {
              user?.role === "student" && 
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 space-y-10">
                {/* Progress Section */}
                <UserProgressChart cardVariants={cardVariants} progressChartConfig={progressChartConfig} studentData={studentData} InfoCard={InfoCard}></UserProgressChart>

                {/* Quiz Performance Section */}
                <QuizChart cardVariants={cardVariants} itemVariants={itemVariants} quizMarksChartConfig={quizMarksChartConfig} studentData={studentData} formatDate={formatDate}></QuizChart>

                {/* Courses Section */}
              
               <CourseChart cardVariants={cardVariants} coursesChartConfig={coursesChartConfig} itemVariants={itemVariants} InfoCard={InfoCard} studentData={studentData}></CourseChart>
          
                 
              
              </div>
            }
            
              <DashboardFooter></DashboardFooter>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global styles */}
      <style jsx global>{`
        .clip-path-card {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 85% 100%, 0 100%);
        }
        .clip-path-profile-header {
          clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
        }
        .clip-path-card-corner {
          clip-path: polygon(100% 0, 100% 100%, 0 0);
        }
        .clip-path-button {
          clip-path: polygon(10% 0, 100% 0, 90% 100%, 0 100%);
        }
        body {
          font-family: 'Inter', sans-serif;
        }
        .progress-indicator {
          background: linear-gradient(to right, #ff6b6b, #4ecdc4);
        }
      `}</style>
    </div>
  )
}

// Reusable Components
const ContactInfo = ({ icon, value, isLink = false, href = "#", variants }) => (
  <motion.div 
    className="flex items-center gap-4 text-sm text-gray-300"
    variants={variants}
    whileHover={{ x: 10, color: "oklch(90% 0.076 70.697)" }}
  >
    {icon}
    {isLink ? (
      <a 
        href={href} 
        className="hover:text-base-content transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {value || "N/A"}
      </a>
    ) : (
      <span>{value || "N/A"}</span>
    )}
  </motion.div>
)
const DetailItem = ({ icon, label, value, highlight = false }) => (
  <motion.div 
    className={`p-3 rounded-xl ${highlight ? 'bg-neutral/30 border border-TealGreen/30' : 'bg-white/5'}`}
    whileHover={{ y: -2 }}
  >
    <div className="flex items-center gap-3">
      <div className={`p-1.5 rounded-md ${highlight ? 'bg-TealGreen/20 text-LightTeal' : 'bg-white/10'}`}>
        {icon}
      </div>
      <div>
        <p className="text-xs text-white/60">{label}</p>
        <p className={`text-sm ${highlight ? 'text-base-content font-medium' : 'text-white/90'}`}>
          {value || 'Not specified'}
        </p>
      </div>
    </div>
  </motion.div>
)
const SocialIcon = ({ href, icon, tooltip }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <motion.a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md shadow-md transition-all"
        whileHover={{ scale: 1.3, rotate: 15 }}
        whileTap={{ scale: 0.9 }}
      >
        {icon}
      </motion.a>
    </TooltipTrigger>
    <TooltipContent className="bg-white/10 backdrop-blur-md text-white border-none">
      {tooltip}
    </TooltipContent>
  </Tooltip>
)

const InfoCard = ({ label, value, highlight = false, variants }) => (
  <motion.div 
    className={`p-5 rounded-xl ${highlight ? 'bg-gradient-to-r from-base-content/20 to-TealGreen/20 border border-neutral/10' : 'bg-white/5 border border-white/10'} backdrop-blur-md shadow-md`}
    variants={variants}
    whileHover={{ scale: 1.05 }}
  >
    <h4 className="text-xs font-semibold text-gray-300 uppercase">{label}</h4>
    <p className={`mt-2 text-sm text-base-content ${highlight ? 'text-TealGreen font-semibold' : 'text-white'}`}>
      {value || 'N/A'}
    </p>
  </motion.div>
)


