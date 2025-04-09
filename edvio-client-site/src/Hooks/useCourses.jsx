import  { useEffect, useState } from 'react'
import useAxiosPublic from './useAxiosPublic'

export default function useCourses() { 
  const axiosPublic = useAxiosPublic()
  const [courses,setCourse] = useState([])
  const allCourses = async()=>{
    const data = await axiosPublic.get('/allCourses')
  setCourse(data?.data?.data)
  }
  
  useEffect(()=>{
    allCourses()
  },[])
  return {courses}
}
