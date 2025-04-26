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
export default function AddressEditProfileModal() {
     const [open, setOpen] = useState(false); 
    const axiosSecure = useAxiosSecure();
    const {userData,refetch} = useOneUser();
    const additionalInfo = async (e)=>{
        e.preventDefault();
           const form = e.target;
           const presentCountry = form.presentCountry.value;
           const presentDistrict = form.presentDistrict.value;
           const presentStreetAddress = form.presentStreetAddress.value;
           const presentPostalCode = form.presentPostalCode.value;
           const presentCity = form.presentCity.value;
           const permanentCountry = form.permanentCountry.value;
           const permanentDistrict = form.permanentDistrict.value;
           const permanentStreetAddress = form.permanentStreetAddress.value;
           const permanentPostalCode = form.permanentPostalCode.value;
           const permanentCity = form.permanentCity.value;
           const presentAddress = {
             country: presentCountry,
             district: presentDistrict,
             streetAddress: presentStreetAddress,
             postalCode: presentPostalCode,
             city: presentCity,
           }
           const permanentAddress = {
            country: permanentCountry,
            district: permanentDistrict,
            streetAddress: permanentStreetAddress,
            postalCode: permanentPostalCode,
            city: permanentCity,
           }
           const address = {
            presentAddress,
            permanentAddress,
           }
           console.log(address)

            try {
        const res = await axiosSecure.put(`/user/${userData?.email}`, address);
        
  
      if (res?.data?.acknowledged && res?.data?.matchedCount > 0) {
       toast(
    <div className="bg-green-100 text-TealGreen font-semibold shadow-md px-4 py-3 rounded-md">
    Address information has been updated successfully
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
          <DialogTitle className={'text-xl opacity-90'}>Address Info Update</DialogTitle>
          <DialogDescription className={'text-sm text-gray-400 opacity-70'}>
            Make changes to your address info. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={additionalInfo}>

        <div className="grid gap-4 py-4 opacity-90">
          <div>
            <h4 className='text-lg font-medium table-border p-2 rounded-lg'>Present Address</h4>
          </div>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <div>
      <Label className="text-left mb-2 block">Your Country</Label>
      <Input type="text" name="presentCountry" placeholder="Country"   defaultValue={userData?.address?.presentAddress?.country}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">District</Label>
      <Input type="text" name="presentDistrict" placeholder="District"   defaultValue={userData?.address?.presentAddress?.district}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">Street Address</Label>
      <Input type="text" name="presentStreetAddress" placeholder="Street Address"   defaultValue={userData?.address?.presentAddress?.streetAddress}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">Postal/ZIP Code</Label>
      <Input type="text" name="presentPostalCode" placeholder="Postal/ZIP Code"   defaultValue={userData?.address?.presentAddress?.postalCode}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">City/Town</Label>
      <Input type="text" name="presentCity" placeholder="City/Town"   defaultValue={userData?.address?.presentAddress?.city}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>

    

  



    </div>
    </div>
        <div className="grid gap-4 py-4 opacity-90">
          <div>
            <h4 className='text-lg font-medium table-border p-2 rounded-lg'>Permanent Address</h4>
          </div>
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
    <div>
      <Label className="text-left mb-2 block">Your Country</Label>
      <Input type="text" name="permanentCountry" placeholder="Country"   defaultValue={userData?.address?.presentAddress?.country}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">District</Label>
      <Input type="text" name="permanentDistrict" placeholder="District"   defaultValue={userData?.address?.presentAddress?.district}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">Street Address</Label>
      <Input type="text" name="permanentStreetAddress" placeholder="Street Address"   defaultValue={userData?.address?.presentAddress?.streetAddress}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">Postal/ZIP Code</Label>
      <Input type="text" name="permanentPostalCode" placeholder="Postal/ZIP Code"   defaultValue={userData?.address?.presentAddress?.postalCode}
      className={'border-TealGreen bg-white/10 backdrop-blur-md text-white placeholder:text-gray-300 focus:outline-none focus:ring-2 focus:ring-TealGreen'} />

    </div>
    <div>
      <Label className="text-left mb-2 block">City/Town</Label>
      <Input type="text" name="permanentCity" placeholder="City/Town"   defaultValue={userData?.address?.presentAddress?.city}
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

