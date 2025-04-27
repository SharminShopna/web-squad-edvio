import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  useEffect(async () => {
    await axios.get("blog.json").then((res) => setBlogPosts(res.data));
  }, []);
  console.log(blogPosts);
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Blog Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-white mb-2">
          Educational Insights & Tips
        </h1>
        <p className="text-xl text-white">
          Discover articles to enhance your learning experience
        </p>
      </div>

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
          >
            {/* Image with category badge */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                {post.category}
              </span>
            </div>

            {/* Blog Content */}
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {post.title}
              </h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>

              {/* Meta info */}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{post.date}</span>
                <Link
                  to={`/blog/${post.id}`}
                  className="text-blue-500 hover:text-blue-700 font-medium flex items-center"
                >
                  Read More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
