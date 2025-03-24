import React from 'react'
import useAxiosSecure from './useAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

export default function useCourseReview() {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const {data : reviews = [], isLoading, refetch} = useQuery({
  queryKey: ['reviews',id],
  queryFn: async()=>{
    const {data} = await axiosSecure.get(`/course_review/${id}`);
    return data?.data;
  }
  })
  return {reviews, isLoading, refetch}
}
