import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/Components/ui/button'
import { Input } from '@/Components/ui/input'
import { Label } from '@/Components/ui/label'
import { FaRegEdit } from 'react-icons/fa'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useAxiosSecure from '@/Hooks/useAxiosSecure'
import useOneUser from '@/Hooks/useOneUser'
import { useState } from "react"
import { toast } from "sonner"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export default function EducationalEditProfileModal() {
  const [open, setOpen] = useState(false); 
  const [graduationYear, setGraduationYear] = useState(null);
  const [currentYear, setCurrentYear] = useState(null);

    const axiosSecure = useAxiosSecure();
    const {userData,refetch} = useOneUser();
    const educationalInfo = async (e)=>{
        e.preventDefault();
         const educationLevel = e.target.educationLevel.value;
         const institutionName = e.target.institutionName.value;
         const degreeTitle = e.target.degreeTitle.value;
         const graduationYear = e.target.graduationYear.value;
         const currentYear = e.target.currentYear.value;
         const cgpa = e.target.cgpa.value;
         const education = {
          educationLevel,institutionName,degreeTitle,graduationYear,currentYear,cgpa,
         }
         console.log(education)
        
            try {
        const res = await axiosSecure.put(`/user/${userData?.email}`,education);
  
      if (res?.data?.acknowledged && res?.data?.matchedCount > 0) {
       toast(
    <div className="bg-green-100 text-TealGreen font-semibold shadow-md px-4 py-3 rounded-md">
       Educational Information is updated successfully
    </div>
  )
  
     refetch();
    setOpen(false); 
  
        }
      } catch (err) {
        console.error("Error updating user:", err);
        toast.custom(() => (
    <div className="bg-red-100 p-4 rounded shadow-md flex items-center justify-between gap-4">
    <div>
        <p className="text-red-600 text-sm font-medium">Uh oh! Something went wrong.</p>
      <p className="text-red-500 text-xs">There was a problem with your request.</p>
    </div>
      <button
        className="border-[1px] border-red-300 text-red-600 text-sm py-1 px-2 rounded-lg"
        onClick={() => {
          setOpen(true)
          toast.dismiss();
        }}
      >
        Try again
      </button>
    </div>
  ))
      }
  
    }
  
  return (
      <div>
<Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
       <FaRegEdit  className="text-2xl cursor-pointer text-white"/>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className={'text-xl opacity-90'}>Additional Info Update</DialogTitle>
          <DialogDescription className={'text-sm text-gray-400 opacity-70'}>
            Make changes to your additional info. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={educationalInfo}>

        <div className="grid gap-4 py-4 opacity-90">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

  
<div>
  <Label htmlFor="educationLevel" className="text-left mb-2 block">Your Education Level</Label>
  <Select name="educationLevel" defaultValue={userData?.education?.educationLevel}>
    <SelectTrigger className="w-full border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen">
      <SelectValue placeholder="Select your education level" />
    </SelectTrigger>
    <SelectContent className="bg-white/10 backdrop-blur-md">
      <SelectItem value="High School">High School</SelectItem>
      <SelectItem value="College">College</SelectItem>
      <SelectItem value="Diploma">Diploma</SelectItem>
      <SelectItem value="Bachelor">Bachelor's</SelectItem>
      <SelectItem value="Master">Master's</SelectItem>
      <SelectItem value="PhD">PhD</SelectItem>
    </SelectContent>
  </Select>
</div>

        
    
    <div>
      <Label className="text-left mb-2 block">Institution Name</Label>
     <Input type="text" name="institutionName" placeholder="Institution Name"   defaultValue={userData?.education?.institutionName}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    
   <div>
         <Label className="text-left mb-2 block">Exam/Degree Title</Label>
     <Input type="text" name="degreeTitle" placeholder="Exam/Degree Title
"   defaultValue={userData?.education?.degreeTitle}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />


   </div>
<div>
  <Label htmlFor="graduationYear" className="text-left mb-2 block">
    Graduation Year
  </Label>
  <div className="relative w-full">
    <DatePicker
      id="graduationYear"
      name="graduationYear"
      selected={graduationYear}
      onChange={(date) => setGraduationYear(date)}
      showYearPicker
      dateFormat="yyyy"
      placeholderText="  Graduation Year"
      className="w-full border border-TealGreen rounded-md py-1 px-2 bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      📅
    </span>
  </div>
</div>
<div>
  <Label htmlFor="graduationYear" className="text-left mb-2 block">
  Current Year
  </Label>
  <div className="relative w-full">
    <DatePicker
      id="currentYear"
      name="currentYear"
      selected={currentYear}
      onChange={(date) => setCurrentYear(date)}
      showYearPicker
      dateFormat="yyyy"
      placeholderText="Current Year"
      className="w-full border border-TealGreen rounded-md py-1 px-2 bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen"
    />
    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
      📅
    </span>
  </div>
</div>


    {/* <div>
            <Label htmlFor="currentYear" className="text-left mb-2 block">Current Year</Label>
     <Input type="text" name="currentYear" placeholder=" Current Year"   defaultValue={userData?.education?.currentYear}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />


    </div> */}
    <div>
            <Label  className="text-left mb-2 block">CGPA (Optional)</Label>
     <Input type="text" name="cgpa" placeholder="CGPA (Optional)"   defaultValue={userData?.education?.cgpa}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />


    </div>
    



  
  
  </div>
</div>
        <DialogFooter>
          <Button type="submit" className={'text-lg bg-TealGreen'}>Save changes</Button>
        </DialogFooter>
        </form>
      </DialogContent>

    </Dialog>

    </div>
  )
}

