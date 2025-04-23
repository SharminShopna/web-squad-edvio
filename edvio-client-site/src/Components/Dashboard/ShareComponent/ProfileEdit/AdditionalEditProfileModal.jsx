
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

export default function AdditionalEditProfileModal() {
   const [open, setOpen] = useState(true); // Modal state
  const axiosSecure = useAxiosSecure();
  const {userData,refetch} = useOneUser();
  const additionalInfo = async (e)=>{
      e.preventDefault();
      const gender = e.target.gender.value;
      const age = e.target.age.value;
      const primaryDeviceType = e.target.device.value;
      const internetType = e.target.internetType.value;
      const yearsOfExperience = e.target.experience.value;
      const additional = {
        gender,age,primaryDeviceType,internetType,yearsOfExperience
      }
      
          try {
      const res = await axiosSecure.put(`/user/${userData?.email}`, additional);
      console.log(res.data)

      if(res?.data?.acknowledged && res?.data?.matchedCount > 0){
        toast("Additional Information is update successfully")
        setOpen(false); 
      }
    } catch (err) {
      console.error("Error updating user:", err);
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
        <form action="" onSubmit={additionalInfo}>

        <div className="grid gap-4 py-4 opacity-90">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    {/* Gender (Checkboxes) */}
    <div>
      <Label className="text-left mb-2 block">Your Gender</Label>
      <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4">
  <label className="flex items-center gap-2">
    <input type="radio" name="gender" value="Male"  defaultChecked={userData?.additional?.gender === "Male"} className="accent-TealGreen " />
    Male
  </label>
  <label className="flex items-center gap-2">
    <input type="radio" name="gender" value="Female" defaultChecked={userData?.additional?.gender === "Female"} className="accent-TealGreen" />
    Female
  </label>
  <label className="flex items-center gap-2">
    <input type="radio" name="gender" value="Other"  defaultChecked={userData?.additional?.gender === "Other"} className="accent-TealGreen" />
    Other
  </label>
</div>

    </div>

    {/* Age Range (Input) */}
    <div>
      <Label htmlFor="ageRange" className="text-left mb-2 block">Age</Label>
      <Input type="number" name="age" placeholder="Age"   defaultValue={userData?.additional?.age}
      className={'border-TealGreen'} />
    </div>

    {/* Primary Device Type */}
    <div>
      <Label htmlFor="deviceType" className="text-left mb-2 block">Primary Device Type</Label>
  <Select name="device" defaultValue={userData?.additional?.primaryDeviceType}>
    <SelectTrigger className="w-full border-TealGreen">
      <SelectValue placeholder="Select your primary device" />
    </SelectTrigger>
    <SelectContent className={'bg-white/10 backdrop-blur-md'}>
      <SelectItem value="Desktop">Desktop</SelectItem>
      <SelectItem value="Laptop">Laptop</SelectItem>
      <SelectItem value="Tablet">Tablet</SelectItem>
      <SelectItem value="Mobile">Mobile</SelectItem>
    </SelectContent>
  </Select>

    </div>
        
    {/* Internet Type */}
    <div>
      <Label htmlFor="internetType" className="text-left mb-2 block">Internet Type</Label>
  <Select name="internetType" defaultValue={userData?.additional?.internetType}>
  <SelectTrigger className="w-full p-2 border-TealGreen rounded-md">
    <SelectValue placeholder="Select Internet Type" />
  </SelectTrigger>
  <SelectContent className={'bg-white/10 backdrop-blur-md'}>
    <SelectItem value="Wi-Fi">Wi-Fi</SelectItem>
    <SelectItem value="Mobile Data">Mobile Data</SelectItem>
    <SelectItem value="Broadband">Broadband</SelectItem>
  </SelectContent>
</Select>

    </div>

    {/* Years of Experience */}
    <div>
      <Label htmlFor="experience" className="text-left mb-2 block">Years of Experience</Label>
    <Select name="experience" defaultValue={userData?.additional?.yearsOfExperience}>
  <SelectTrigger className="w-full p-2 border-TealGreen rounded-md">
    <SelectValue placeholder="Years of Experience" />
  </SelectTrigger>
  <SelectContent className={'bg-white/10 backdrop-blur-md'}>
    <SelectItem value="0-1">0–1</SelectItem>
    <SelectItem value="1-3">1–3</SelectItem>
    <SelectItem value="3-5">3–5</SelectItem>
    <SelectItem value="5+">5+</SelectItem>
  </SelectContent>
</Select>

    </div>

    {/* Employment Role */}
    <div>
      <Label htmlFor="role" className="text-left mb-2 block">Employment Role</Label>
<Input
  type="text"
   value={userData?.role ? userData.role.charAt(0).toUpperCase() + userData.role.slice(1) : ""}
  readOnly
  disabled
  className="border-TealGreen bg-gray-500 cursor-not-allowed"
/>


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
