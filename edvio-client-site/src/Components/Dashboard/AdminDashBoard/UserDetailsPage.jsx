
import useAxiosSecure from '@/Hooks/useAxiosSecure'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { motion, AnimatePresence, hover } from "framer-motion"
import { Avatar } from "@/components/ui/avatar"
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Globe, Github, Linkedin, FileText, Smartphone, Mail, 
  MapPin, Calendar, Download, Edit2, BarChart2, CheckCircle, GraduationCap,
  Laptop,
  School,
  CalendarCheck,
  Building2
} from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Progress } from "@/components/ui/progress"
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
import { Bar, Line, Pie } from 'react-chartjs-2'
import { FaInfoCircle } from 'react-icons/fa'
import { Award, BookOpen, Home, Star, User, Wifi } from 'react-feather'
import { FaLocationDot } from 'react-icons/fa6'

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
            <motion.div
              className="text-center mb-10 relative h-full"
              variants={clipPathVariants}
            >
                <div className="gap-4 text-center sm:text-left p-6 bg-base-200 rounded-lg shadow-xl clip-path-triangle lg:w-[60%]">
             <motion.h3 
                className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-TealGreen to-base-content drop-shadow-lg"
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                {studentData.name}
              </motion.h3>
                <motion.p 
                className="text-lg text-gray-300 font-medium mb-2"
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                Academic Performance Dashboard
              </motion.p>
        <p className="text-base opacity-[0.8]">
        Explore detailed information about this user, including their role, current activity status, academic performance and contact details. Stay connected and manage interactions seamlessly to foster a smooth and engaging experience on the platform.
       </p>
       </div>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Profile Card with glassmorphism */}
              <motion.div 
                variants={cardVariants}
                className="lg:col-span-1"
              >
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
                      <Avatar className="w-36 h-36 border-6 border-white/30 shadow-2xl group-hover:scale-105 transition-transform duration-300">
                        {studentData.image ? (
                          <img 
                            src={studentData.image} 
                            alt={studentData.name} 
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-[#ff6b6b] to-[#4ecdc4] flex items-center justify-center text-5xl font-bold text-white">
                            {studentData.name?.charAt(0)}
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

              </motion.div>



              <div className='col-span-2'>
                  <motion.div variants={cardVariants} className='col-span-2 mb-6'>
                  <Card className="bg-white/10 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden clip-path-card">
                    <CardHeader className="bg-gradient-to-r from-[#4ecdc4]/20 to-base-content/20 py-5 px-5">
                      <motion.div className="flex items-center gap-4" variants={itemVariants}>
                        <FaInfoCircle className="h-6 w-6 text-LightTeal" />
                        <h3 className="text-2xl font-semibold text-white">Additional Information</h3>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
    <motion.div
  className="p-6 rounded-2xl bg-gradient-to-br from-TealGreen/40 to-base-content/30 backdrop-blur-lg border border-white/20 shadow-lg"
  whileHover={{ 
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(99, 102, 241, 0.3)"
  }}
  transition={{ duration: 0.3 }}
>
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-lg bg-white/10">
      <User className="h-5 w-5 text-LightTeal" />
    </div>
    <h4 className="font-semibold text-white/90 text-lg">Personal Details</h4>
  </div>

  {studentData?.additional ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem 
        icon={<User className="h-4 w-4 text-LightTeal" />}
        label="Gender"
        value={studentData?.additional?.gender}
      />
      <DetailItem
        icon={<Calendar className="h-4 w-4 text-LightTeal" />}
        label="Age"
        value={studentData?.additional?.age}
      />
      <DetailItem
        icon={<Laptop className="h-4 w-4 text-LightTeal" />}
        label="Primary Device"
        value={studentData?.additional?.primaryDeviceType}
      />
      <DetailItem
        icon={<Wifi className="h-4 w-4 text-LightTeal" />}
        label="Internet"
        value={studentData?.additional?.internetType}
      />
      <DetailItem
        icon={<Award className="h-4 w-4 text-LightTeal" />}
        label="Experience"
        value={studentData?.additional?.yearsOfExperience}
        highlight
      />
    </div>
  ) : (
    <div className="py-4 text-center">
      <p className="text-gray-400/80 text-sm">No additional information provided</p>
    </div>
  )}
</motion.div>
              <motion.div
  className="p-6 rounded-2xl bg-gradient-to-br from-TealGreen/40 to-base-content/30 backdrop-blur-lg border border-white/20 shadow-lg"
  whileHover={{ 
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.3)" // Updated to match teal color
  }}
  transition={{ duration: 0.3 }}
>
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-lg bg-white/10">
      <GraduationCap className="h-5 w-5 text-LightTeal" /> {/* Changed to GraduationCap */}
    </div>
    <h4 className="font-semibold text-white/90 text-lg">Educational Details</h4>
  </div>

  {studentData?.education ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem 
        icon={<BookOpen className="h-4 w-4 text-LightTeal" />} 
        label="Education Level"
        value={studentData?.education?.educationLevel}
      />
      <DetailItem
        icon={<School className="h-4 w-4 text-LightTeal" />} 
        label="Institution"
        value={studentData?.education?.institutionName}
      />
      <DetailItem
        icon={<FileText className="h-4 w-4 text-LightTeal" />} 
        label="Degree"
        value={studentData?.education?.degreeTitle}
      />
      <DetailItem
        icon={<CalendarCheck className="h-4 w-4 text-LightTeal" />}
        label="Graduation Year"
        value={studentData?.education?.graduationYear}
      />
      <DetailItem
        icon={<Calendar className="h-4 w-4 text-LightTeal" />} 
        label="Current Year"
        value={studentData?.education?.currentYear}
      />
      <DetailItem
        icon={<Star className="h-4 w-4 text-LightTeal" />} 
        label="CGPA"
        value={studentData?.education?.cgpa}
        highlight
      />
    </div>
  ) : (
    <div className="py-4 text-center">
      <p className="text-gray-400/80 text-sm">No educational information provided</p>
    </div>
  )}
</motion.div>
              
          
  
                    
                    </CardContent>
                  </Card>
                </motion.div>


                <motion.div variants={cardVariants} className='col-span-2'>
                  <Card className="bg-white/10 backdrop-blur-xl border-none shadow-2xl rounded-2xl overflow-hidden clip-path-card">
                    <CardHeader className="bg-gradient-to-r from-[#4ecdc4]/20 to-base-content/20 py-5 px-5">
                      <motion.div className="flex items-center gap-4" variants={itemVariants}>
                        <FaLocationDot  className="h-6 w-6 text-LightTeal" />
                        <h3 className="text-2xl font-semibold text-white">Address Information</h3>
                      </motion.div>
                    </CardHeader>
                    <CardContent className="py-10 px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
  <motion.div
  className="p-6 rounded-2xl bg-gradient-to-br from-TealGreen/40 to-base-content/30 backdrop-blur-lg border border-white/20 shadow-lg"
  whileHover={{ 
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.3)" // Updated to teal color
  }}
  transition={{ duration: 0.3 }}
>
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-lg bg-white/10">
      <MapPin className="h-5 w-5 text-LightTeal" /> 
    </div>
    <h4 className="font-semibold text-white/90 text-lg">Present Address</h4>
  </div>

  {studentData?.address?.presentAddress ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem 
        icon={<Globe className="h-4 w-4 text-LightTeal" />} 
        label="Country"
        value={studentData.address.presentAddress.country}
      />
      <DetailItem
        icon={<MapPin className="h-4 w-4 text-LightTeal" />} 
        label="District"
        value={studentData.address.presentAddress.district}
      />
      <DetailItem
        icon={<Home className="h-4 w-4 text-LightTeal" />}
        label="Street Address"
        value={studentData.address.presentAddress.streetAddress}
      />
      <DetailItem
        icon={<Mail className="h-4 w-4 text-LightTeal" />}  
        label="Postal Code"
        value={studentData.address.presentAddress.postalCode}
      />
      <DetailItem
        icon={<Building2 className="h-4 w-4 text-LightTeal" />} 
        label="City"
        value={studentData.address.presentAddress.city}
        highlight
      />
    </div>
  ) : (
    <div className="py-4 text-center">
      <p className="text-gray-400/80 text-sm">No address information provided</p>
    </div>
  )}
</motion.div>
            <motion.div
  className="p-6 rounded-2xl bg-gradient-to-br from-TealGreen/40 to-base-content/30 backdrop-blur-lg border border-white/20 shadow-lg"
  whileHover={{ 
    scale: 1.03,
    boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.3)"
  }}
  transition={{ duration: 0.3 }}
>
  <div className="flex items-center gap-3 mb-4">
    <div className="p-2 rounded-lg bg-white/10">
      <MapPin className="h-5 w-5 text-LightTeal" />
    </div>
    <h4 className="font-semibold text-white/90 text-lg">Permanent Address</h4>
  </div>

  {studentData?.address?.permanentAddress ? (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <DetailItem 
        icon={<Globe className="h-4 w-4 text-LightTeal" />}
        label="Country"
        value={studentData.address.permanentAddress.country}
      />
      <DetailItem
        icon={<MapPin className="h-4 w-4 text-LightTeal" />}
        label="District"
        value={studentData.address.permanentAddress.district}
      />
      <DetailItem
        icon={<Home className="h-4 w-4 text-LightTeal" />}
        label="Street Address"
        value={studentData.address.permanentAddress.streetAddress}
      />
      <DetailItem
        icon={<Mail className="h-4 w-4 text-LightTeal" />}
        label="Postal Code"
        value={studentData.address.permanentAddress.postalCode}
      />
      <DetailItem
        icon={<Building2 className="h-4 w-4 text-LightTeal" />}
        label="City"
        value={studentData.address.permanentAddress.city}
        highlight
      />
    </div>
  ) : (
    <div className="py-4 text-center">
      <p className="text-gray-400/80 text-sm">No address information provided</p>
    </div>
  )}
</motion.div>
          
  
                    
                    </CardContent>
                  </Card>
                </motion.div>

              </div>

              {/* Details Column */}
              
            </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6 space-y-10">
                {/* Progress Section */}
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

                {/* Quiz Performance Section */}
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

                {/* Courses Section */}
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

          

              
              </div>
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


