import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/register", { name, email, password }).then((result) => {
      console.log(result.data.msg);
      if (result.data.success) {
        //toast
        toast.success("Signup success", {
          position: "bottom-center",
        });
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        //toast
        toast.error(result.data.msg, {
          position: "bottom-center",
        });
      }
    });
  };

  return (
    <div className="text-white h-[100vh] flex justify-center items-center bg-cover">
      <div>
        <div className="bg-slate-800 border border-slate-400 rounded-md p-8 shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 relative">
          <h1 className="text-4xl text-whitefont-bold text-center mb-6">
            Signup
          </h1>
          <div className="relative my-4">
            <label htmlFor="">Enter Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              required
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="">Enter Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              required
            />
          </div>
          <div className="relative my-8">
            <label htmlFor="">Enter Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              className="block w-72 py-2.3 px-0 text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:text-white focus:border-blue-600 peer"
              required
            />
          </div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="w-full mb-4 text-[18px] mt-6 rounded-full bg-white text-emerald-800 hover:bg-emerald-300 text-gray-800 py-2 transition-colors"
          >
            Signup
          </button>
          <div>
            <span className="mt-4">
              already have an account?{" "}
              <Link className="text-blue-500" to="/login">
                login here
              </Link>
            </span>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default Signup;
