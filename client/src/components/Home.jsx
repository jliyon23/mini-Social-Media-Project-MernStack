import { useEffect, useState } from "react";
import Footer from "./Footer";
import Head from "./Head";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Home() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if(!token || token == undefined){
       navigate('/login') 
    }
    axios
      .get("/journals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
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
  return (
    <>
      <Head />
      <section className="py-8">
        <div className="max-w-screen-xl mx-auto px-4 md:px-8">
          <div className="space-y-5 sm:text-center sm:max-w-md sm:mx-auto">
            <h1 className="text-white text-3xl font-extrabold sm:text-4xl">
              Welcome {user?.name}
            </h1>
            <p className="text-gray-200">
              Blogs that are loved by the community. Updated every hour.
            </p>
          </div>
          <ul className="grid gap-x-8 gap-y-10 mt-16 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <li
                key={post._id}
                className="w-full mx-auto group sm:max-w-sm bg-slate-800 border border-slate-400 rounded-md p-4 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30"
              >
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
                      {post.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Footer />
    </>
  );
}
