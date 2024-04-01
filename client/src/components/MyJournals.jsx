import { useEffect, useState } from "react";
import Footer from "./Footer";
import Head from "./Head";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

function MyJournals() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
    axios
      .post(
        "/myjournals",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        const { data } = response;
        if (data.success) {
          setUser(data.user);
          setPosts(data.posts);
        } else {
          navigate("/login");
        }
      })
      .catch((error) => {
        console.error("Error fetching user details:", error);
      });
  }, [navigate]);

  const handleDelete = (postId) => {
    const token = localStorage.getItem("token");
    axios
      .delete(`/posts/delete/${postId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const { data } = response;
        console.log(data);
        if (data.success) {
          toast.success("Post Deleted", {
            position: "bottom-center",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(data.msg, {
            position: "bottom-center",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Head />
      <section className="py-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
            <h1 className="text-white text-3xl font-extrabold sm:text-4xl">
              Your Posts
            </h1>
          </div>
          <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post._id}
                className="w-full mx-auto group sm:max-w-sm bg-slate-800 border border-slate-400 rounded-md p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30"
              >
                <button
                  onClick={() => handleDelete(post._id)}
                  className="px-2.5 py-2.5 mb-2 text-indigo-600 duration-150 bg-indigo-50 rounded-lg hover:bg-indigo-100 active:bg-indigo-200"
                >
                  Delete
                </button>
                <Link to={`/posts/${post._id}`}>
                  <img
                    src={post.photo}
                    loading="lazy"
                    alt={post.title}
                    className="w-full rounded-lg"
                  />
                  <div className="mt-3 space-y-2">
                    <span className="block text-white text-sm">
                      {post.title}
                    </span>
                    <h3 className="text-lg text-white duration-150 group-hover:text-indigo-500 font-semibold">
                      {post.location}
                    </h3>
                    <p className="text-gray-300 text-sm duration-150 ">
                      {post.date}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Toaster />
      <Footer />
    </>
  );
}

export default MyJournals;
