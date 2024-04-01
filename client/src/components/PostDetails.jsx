import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Head from "./Head";
import Footer from "./Footer";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .get(`/posts/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data.msg);
        if (data.success) {
          console.log(data.post);
          setPost(data.post);
          setLoading(false);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching post details:", error);
        setLoading(false);
      });
  }, [postId, navigate]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
      <Head />
      <div className="w-full mt-12 mb-12 mx-auto group md:w-auto bg-slate-800 border border-slate-400 rounded-md p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30">
        <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl px-8 pb-8 pt-40 w-full  mx-auto mt-4 mb-4">
          <img
            src={post.photo}
            alt="University of Southern California"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t h-full from-gray-900 via-gray-900/40"></div>
          <h3 className="z-10 mt-3 text-3xl font-bold text-white">
            {post.location}
          </h3>
          <div className="z-10 gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
            {post.date}
          </div>
        </article>
        <div className="mt-3 space-y-2">
          <p className="text-gray-300 text-sm duration-150 ">
            {post.description}
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PostDetails;
