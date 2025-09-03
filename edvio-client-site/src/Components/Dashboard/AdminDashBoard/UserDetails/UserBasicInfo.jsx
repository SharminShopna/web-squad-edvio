import React from 'react'
import { motion} from "framer-motion"
import { Card, CardContent, CardHeader } from '@/Components/ui/card'
import { FaInfoCircle } from 'react-icons/fa'
import { Award, BookOpen, Calendar, FileText, Globe, Home, Mail, MapPin, Star, User, Wifi } from 'react-feather'
import { Building2, CalendarCheck, GraduationCap, Laptop, School } from 'lucide-react'
import { FaLocationDot } from 'react-icons/fa6'
export default function UserBasicInfo({cardVariants,itemVariants,studentData,DetailItem}) {
  return (
    <div>
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
  )
}

