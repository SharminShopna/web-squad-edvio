import UseAuth from '@/Hook/UseAuth';
import useAxiosSecure from '@/Hooks/useAxiosSecure';
import useCourseReview from '@/Hooks/useCourseReview';
import React from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

export default function ReviewForm({_id}) {
const {user} = UseAuth();
const axiosSecure  = useAxiosSecure();
  const {refetch} = useCourseReview();
  const { register, handleSubmit, formState: { errors }, reset} = useForm();

     const onSubmit = async (data) => {
      const reviewInfo = {
        name: data.name,
        email: data.email,
        image: user?.photoURL,
        opinion: data.opinion,
        rating: Number(data.rating),
        date_time: new Date().toISOString(),
        course_id: _id,
      }
      try{
        const course_review = await axiosSecure.post('/course_review',reviewInfo);
        const res = course_review?.data?.data;
        if(res?.acknowledged && res?.insertedId){
        toast.success(course_review.data?.message);
        reset();
        refetch();
        }
      }catch(err){
      
        console.log(err)
      }
       
    }
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
             <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                <label className="form-control w-full ">
                <div className="label">
               <span className="text-lg text-gray-200 font-medium">Name</span>
               </div> <br />
               <input type="text" value={user?.displayName} readOnly {...register("name", { required: true })} placeholder="Enter Your Name" className="border-[1px] border-LightTeal w-full py-2 px-3 rounded-lg mt-2 focus:outline-TealGreen" />
              </label>
               <label htmlFor="">
                <div className="label">
               <span className="text-lg text-gray-200 font-medium">Email Address</span>
               </div> <br />
                <input type="email" value={user?.email} readOnly {...register("email", { required: true })} placeholder="Enter Your Email Address" className="border-[1px] border-LightTeal w-full py-2 px-3 rounded-lg mt-2 focus:outline-TealGreen" />
               </label>
              </div>
              <div className="mt-6">
                <label className="form-control w-full ">
                <div className="label">
               <span className="text-lg text-gray-200 font-medium">Rating</span>
               </div> <br />
               <input type="number" min={1} max={5} step="0.1" {...register("rating", { required: true })} placeholder="Rating" className="border-[1px] border-LightTeal w-full py-2 px-3 rounded-lg mt-2 focus:outline-TealGreen" />
                 {errors.rating && errors.rating.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Give Your Rating</span>}
              </label>
              </div>
                <div>
                   <label htmlFor="">
                <div className="label">
               <span className="text-lg text-gray-200 font-medium mt-6">Give Your Review</span>
               </div> <br />
                 <textarea {...register("opinion", { required: true })} id="" cols="10" rows="8" className="border-[1px] border-LightTeal w-full py-2 px-3 rounded-lg mt-2 focus:outline-TealGreen"></textarea>
                 {errors.opinion && errors.opinion.type === 'required' && <span className=" text-red-500 mt-1 inline-block">Give Your Review</span>}
               </label>
                </div>
                <div>
                  <button className="proCardButton">Add Your Review</button>
                </div>
           </form>
    </div>
  )
}
