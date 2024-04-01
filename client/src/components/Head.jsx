import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

export default function Head() {
  const navigate = useNavigate();
  const [title, setTitle] = useState();
  const [location, setLocation] = useState();
  const [date, setDate] = useState();
  const [description, setDescription] = useState();
  const [image, setImage] = useState();
  const [uploadStatus, setUploadStatus] = useState("image not uploaded");

  const handleLogout = (e) => {
    e.preventDefault();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Remove token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const [state, setState] = useState(false);

  const navigation = [
    { title: "Journals", path: "/" },
    { title: "My Journals", path: "/myjournals" },
    { title: "Contact", path: "/contact" },
    { title: "Profile", path: "/profile" },
  ];

  const uploadPreset = "";
  const cloudName = "";
  const cloudinaryAPI_LINK = "";

  function uploadImage(pic) {
    if (pic && (pic.type == "image/jpeg" || pic.type == "image/jpg")) {
      setUploadStatus("image uploading");
      const data = new FormData();
      data.append("file", pic);
      data.append("upload_preset", uploadPreset);
      data.append("cloud_name", cloudName);
      fetch(cloudinaryAPI_LINK, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setImage(data.url.toString());
          console.log(data.url.toString());
          setUploadStatus("image uploaded");
        })
        .catch((err) => console.log(err));
    }
  }

  function submitPost(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .post(
        "/newpost",
        {
          title,
          location,
          date,
          description,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        if (result.data.success) {
          toast.success("New Post Uploaded", {
            position: "bottom-center",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        } else {
          toast.error(result.data.msg, {
            position: "bottom-center",
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
        }
      });
  }

  return (
    <nav className="bg-slate-800 border border-slate-400 rounded-md shadow-lg backdrop-filter backdrop-blur-sm bg-opacity-30 w-full border-b md:border-0 md:static">
      <div className="items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <a href="#">
            <h2 className="text-white text-2xl">WayWeGo</h2>
          </a>
          <div className="md:hidden">
            <button
              className="text-white outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
            state ? "block" : "hidden"
          }`}
        >
          <ul className="justify-center items-center space-y-8 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, idx) => {
              return (
                <li key={idx} className="text-white hover:text-indigo-600">
                  <Link to={item.path}>{item.title}</Link>
                </li>
              );
            })}
            <li>
              <Dialog.Root>
                <Dialog.Trigger className="py-3 px-4 border border-gray-200 bg-gray-200 text-gray-700 rounded-md m-2 transition duration-500 ease select-none hover:bg-gray-300 focus:outline-none focus:shadow-outline">
                  New Post
                </Dialog.Trigger>
                <Dialog.Portal>
                  <Dialog.Overlay className="fixed inset-0 w-full h-72 overflow-scroll bg-black opacity-40" />
                  <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
                    <div className="bg-white rounded-md shadow-lg px-4 py-6">
                      {uploadStatus === "image not uploaded" && (
                        <div className=" flex items-center justify-center h-12 mx-auto bg-red-300 ">
                          Image Not Uploaded!!
                        </div>
                      )}
                      {uploadStatus === "image uploading" && (
                        <div className=" flex items-center justify-center h-12 mx-auto bg-yellow-300 ">
                          Image Uploading...
                        </div>
                      )}
                      {uploadStatus === "image uploaded" && (
                        <div className=" flex items-center justify-center h-12 mx-auto bg-green-200 ">
                          Image Uploaded
                        </div>
                      )}
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Title
                        </label>
                        <input
                          onChange={(e) => setTitle(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Username"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Location
                        </label>
                        <input
                          onChange={(e) => setLocation(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="text"
                          placeholder="Username"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Date
                        </label>
                        <input
                          onChange={(e) => setDate(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="date"
                          placeholder="Username"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Description
                        </label>
                        <input
                          onChange={(e) => setDescription(e.target.value)}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          id="username"
                          type="text"
                          placeholder="Username"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                          Images
                        </label>
                        <input
                          accept="image/*"
                          onChange={(e) => uploadImage(e.target.files[0])}
                          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                          type="file"
                        />
                      </div>
                      <div className="items-center gap-2 mt-3 text-sm sm:flex">
                        <Dialog.Close asChild>
                          <button
                            onClick={submitPost}
                            className="w-full mt-2 p-2.5 flex-1 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                          >
                            Post
                          </button>
                        </Dialog.Close>
                        <Dialog.Close asChild>
                          <button
                            className="w-full mt-2 p-2.5 flex-1 text-gray-800 rounded-md outline-none border ring-offset-2 ring-indigo-600 focus:ring-2"
                            aria-label="Close"
                          >
                            Cancel
                          </button>
                        </Dialog.Close>
                      </div>
                      <Toaster />
                    </div>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="py-3 px-4 text-white bg-indigo-600 hover:bg-indigo-700 rounded-md shadow"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
        <div className="hidden md:inline-block"></div>
      </div>
    </nav>
  );
}
