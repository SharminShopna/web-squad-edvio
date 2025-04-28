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
export default function BasicInfoEditModal() {
   const [open, setOpen] = useState(false); 
    const axiosSecure = useAxiosSecure();
    const {userData,refetch} = useOneUser();
    const basicInfo = async (e)=>{
        e.preventDefault();
         const name = e.target.name.value;
         const email = e.target.email.value;
         const mobile = e.target.mobile.value;
         const basicInfo = {
          name,email,mobile,
         }
        
            try {
        const res = await axiosSecure.put(`/user/${userData?.email}`,basicInfo);
        
  
      if (res?.data?.acknowledged && res?.data?.matchedCount > 0) {
       toast(
    <div className="bg-green-100 text-TealGreen font-semibold shadow-md px-4 py-3 rounded-md">
      Basic Information is updated successfully
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
          <DialogTitle className={'text-xl opacity-90'}>Basic Info Update</DialogTitle>
          <DialogDescription className={'text-sm text-gray-400 opacity-70'}>
            Make changes to your Basic info. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={basicInfo}>

        <div className="grid gap-4 py-4 opacity-90">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

  
    <div>
      <Label className="text-left mb-2 block">Full Name</Label>
      <Input type="text" name="name" placeholder="Full Name"   defaultValue={userData?.name}
      readOnly
  disabled
  className="border-TealGreen bg-gray-500 cursor-not-allowed text-gray-100" />
    </div>
    <div>
      <Label className="text-left mb-2 block">Email</Label>
      <Input type="mail" name="email" placeholder="Email"   defaultValue={userData?.email}
        readOnly
  disabled
  className="border-TealGreen bg-gray-500 cursor-not-allowed text-gray-100"/>
    </div>
    <div>
      <Label className="text-left mb-2 block">Id</Label>
      <Input type="mail" name="id" placeholder="Id"   defaultValue={userData?._id}
        readOnly
  disabled
  className="border-TealGreen bg-gray-500 cursor-not-allowed text-gray-100"/>
    </div>
    <div>
      <Label className="text-left mb-2 block">Mobile Number</Label>
      <Input type="phone" name="mobile" placeholder="Mobile Number
"   defaultValue={userData?.mobile}
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
