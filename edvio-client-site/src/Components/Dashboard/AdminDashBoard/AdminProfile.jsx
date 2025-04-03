
import { CiFacebook } from "react-icons/ci";
import { PiInstagramLogoLight } from "react-icons/pi";
import { RiTwitterXFill } from "react-icons/ri";
import { IoLogoGithub } from "react-icons/io";
import Profile from "../ShareComponent/Profile";
import BasicInfo from "../ShareComponent/BasicInfo";
import AdditionalInfo from "../ShareComponent/AdditionalInfo";
import Address from "../ShareComponent/Address";
import Education from "../ShareComponent/Education";
import ImportantLinks from "../ShareComponent/ImportantLinks";
export default function AdminProfile() {
   const socialLink = [
    {to: '', icon: <CiFacebook />},
    {to: '', icon: <PiInstagramLogoLight />},
    {to: '', icon: <RiTwitterXFill />},
    {to: '', icon: <IoLogoGithub />},
   ]
  return (
       <div>
        <Profile socialLink={socialLink}></Profile>
        <div className="m-10">
          <BasicInfo></BasicInfo>
          <AdditionalInfo></AdditionalInfo>
          <Address></Address>
          <Education></Education>
          <ImportantLinks></ImportantLinks>
        </div>
       </div>
  )
}
