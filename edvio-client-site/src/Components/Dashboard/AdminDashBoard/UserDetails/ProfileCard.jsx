import React from 'react';
import { motion } from 'framer-motion';
import Card from '@/Components/WhyUs/Card';
import { Avatar } from '@radix-ui/react-avatar';
import { CardContent, CardHeader, CardFooter } from '@/Components/ui/card';
import { Calendar, FileText, Globe, Linkedin, Mail, MapPin, Smartphone } from 'react-feather';
import { Github } from 'lucide-react';

export default function ProfileCard({
  studentData,
  cardVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } },
  clipPathVariants = { hidden: { clipPath: 'inset(100% 0 0 0)' }, visible: { clipPath: 'inset(0% 0 0 0)' } },
  itemVariants = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } },
  ContactInfo,
  formatDate,
}) {
  return (
    <motion.div variants={cardVariants} className="lg:col-span-1">
        <motion.div
          className="h-48 bg-gradient-to-r from-neutral to-base-content relative"
          variants={clipPathVariants}
        >
          <div className="absolute inset-0 clip-path-profile-header" />
          <motion.div
            className="absolute -bottom-20 left-1/2 -translate-x-1/2"
            initial={{ scale: 0.6, opacity: 0, rotate: -15 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 200, delay: 0.5 }}
          >
            <Avatar className="w-36 h-36 rounded-full border-6 border-white/30 shadow-2xl group-hover:scale-105 transition-transform duration-300">
              {studentData.image ? (
                <img
                  src={studentData.image}
                  alt={studentData.name}
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#ff6b6b] to-[#4ecdc4] flex items-center justify-center text-5xl font-bold text-white rounded-full">
                  {studentData.name?.charAt(0)}
                </div>
              )}
            </Avatar>
          </motion.div>
        </motion.div>

        <CardHeader className="pt-28 text-center px-10">
          <motion.h2 className="text-3xl font-bold text-base-content mb-3" variants={itemVariants}>
            {studentData.name}
          </motion.h2>
          <motion.p className="text-[#4ecdc4] font-semibold text-lg" variants={itemVariants}>
            {studentData.education?.degreeTitle || 'N/A'}
          </motion.p>
          <motion.p className="text-gray-300 text-sm" variants={itemVariants}>
            {studentData.education?.institutionName || 'N/A'}
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
            value={
              studentData.address?.presentAddress?.city
                ? `${studentData.address.presentAddress.city}, ${studentData.address.presentAddress.country}`
                : 'N/A'
            }
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
      
    </motion.div>
  );
}