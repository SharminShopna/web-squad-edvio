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

export default function ImportantLinksEditModal() {
   const [open, setOpen] = useState(false); 
    const axiosSecure = useAxiosSecure();
    const {userData,refetch} = useOneUser();
    const importantLinksInfo = async (e)=>{
        e.preventDefault();
         const cvLink = e.target.cvLink.value;
         const githubProfile = e.target.githubProfile.value;
         const portfolioLink = e.target.portfolioLink.value;
         const linkedinProfile = e.target.linkedinProfile.value;
         const links = {
          cvLink, githubProfile, portfolioLink, linkedinProfile
         }
        
        
            try {
        const res = await axiosSecure.put(`/user/${userData?.email}`, links );
  
      if (res?.data?.acknowledged && res?.data?.matchedCount > 0) {
       toast(
    <div className="bg-green-100 text-TealGreen font-semibold shadow-md px-4 py-3 rounded-md">
      Important Links are updated successfully
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
          <DialogTitle className={'text-xl opacity-90'}>Important Links Update</DialogTitle>
          <DialogDescription className={'text-sm text-gray-400 opacity-70'}>
            Make changes to your important links. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={importantLinksInfo}>

        <div className="grid gap-4 py-4 opacity-90">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

  
    <div>
      <Label  className="text-left mb-2 block">CV link (Google Drive)</Label>
      <Input type="url" name="cvLink" placeholder="CV link (Google Drive)"   defaultValue={userData?.links?.cvLink}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />
    </div>
    <div>
      <Label  className="text-left mb-2 block">Github Profile</Label>
      <Input type="url" name="githubProfile" placeholder="Github Profile"   defaultValue={userData?.links?.githubProfile}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />
    </div>
    <div>
      <Label  className="text-left mb-2 block">Portfolio link</Label>
      <Input type="url" name="portfolioLink" placeholder="Portfolio link"   defaultValue={userData?.links?.portfolioLink}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />
    </div>
    <div>
      <Label  className="text-left mb-2 block">LinkedIn Profile link</Label>
      <Input type="url" name="linkedinProfile" placeholder="LinkedIn Profile link"   defaultValue={userData?.links?.linkedinProfile}
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
