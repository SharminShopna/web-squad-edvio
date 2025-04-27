import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get("blog.json");
      console.log(res.data);
      if (Array.isArray(res.data)) {
        setBlogPosts(res.data);
      } else if (res.data.posts) {
        setBlogPosts(res.data.posts);
      }
    };
    fetchData();
  }, []);

  return (
    // <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
    //   <article className="prose prose-lg max-w-none">
    //     <div className="mb-8">
    //       <span className="inline-block bg-blue-100 text-blue-800 text-sm font-semibold px-3 py-1 rounded-full mb-4">
    //         {post.category}
    //       </span>
    //       <h1 className="text-3xl font-bold text-gray-900 mb-2">
    //         {post.title}
    //       </h1>
    //       <p className="text-gray-500">{post.date}</p>
    //     </div>

    //     <img
    //       src={post.image}
    //       alt={post.title}
    //       className="w-full h-96 object-cover rounded-lg mb-8"
    //     />

    //     <div dangerouslySetInnerHTML={{ __html: post.content }} />
    //   </article>
    // </div>
    <div></div>
  );
};

export default BlogDetails;
