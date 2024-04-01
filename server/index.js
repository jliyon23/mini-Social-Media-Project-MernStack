require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const UserModel = require("./models/UserModel");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const PostModel = require("./models/PostModel");

const app = express();
const PORT = process.env.PORT || 5005;

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());
mongoose
  .connect(
    process.env.MONGO_DB
  )
  .then(() => {
    console.log("mongodb connected");
  });

const verifyUser = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);
  if (!token) {
    return res.status(401).json({success:false, msg: "Token not available" });
  } else {
    jwt.verify(
      token.split(" ")[1],
      process.env.JWT_SECRET,
      async (err, decoded) => {
        if (err) return res.status(401).json({success: false, message: "Token invalid" });
        try {
          const user = await UserModel.findOne({ email: decoded.email });
          if (!user) {
            return res.status(404).json({success: false, message: "User not found" });
          }
          req.user = user; // Attach user object to request for further processing
          next();
        } catch (error) {
          console.error("Error finding user:", error);
          res.status(500).json({success:false, error: "Internal Server Error" });
        }
      }
    );
  }
};

app.get("/journals", verifyUser, async (req, res) => {
  try {
    // Retrieve all posts from the database
    const posts = await PostModel.find();

    // Send the posts along with the user details
    return res.json({
      success: true,
      msg: "Success token authorized",
      user: req.user,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
});
app.post("/myjournals", verifyUser, async (req, res) => {
  try {
    const { email } = req.user;
    // Retrieve all posts from the database
    const posts = await PostModel.find({ email: email });

    // Send the posts along with the user details
    return res.json({
      success: true,
      msg: "Success token authorized",
      user: req.user,
      posts,
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.get("/posts/:postId", verifyUser, async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await PostModel.findById(postId);
    return res.json({ success: true, msg: "Success token authorized", post });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "An internal server error occurred" });
  }
});

app.delete("/posts/delete/:postId", verifyUser, async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) {
      return res.json({ success:false, msg: "Post not found" });
    }
    return res.json({ success: true, msg: "Post deleted successfully" });
  } catch (error) {
    console.error("Error deleting post:", error);
    return res.json({ error: "An internal server error occurred" });
  }
});

app.post("/newpost", verifyUser, async (req, res) => {
  try {
    const { email } = req.user;
    const { title, location, date, description, image } = req.body;
    console.log(
      `email: ${email} \ntitle: ${title} \nlocation: ${location} \ndate: ${date} \ndescription: ${description} \nimage: ${image}`
    );
    const newPost = await PostModel.create({
      email,
      title,
      location,
      date,
      description,
      photo: image,
    });
    newPost.save();

    res.status(201).json({ success: true, msg: "new post uploaded" });
  } catch (error) {
    res.json({ msg: error });
  }
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  console.log(`email : ${email}\npassword : ${password}`);
  UserModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        const token = jwt.sign(
          {
            email: user.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "1d",
          }
        );
        res.cookie("token", token);

        res.json({
          success: true,
          msg: "Login success",
          token: token,
          user: user,
        });
      } else {
        res.json({ success: false, msg: "Incorrect password" });
      }
    } else {
      res.json({ success: false, msg: "User not found" });
    }
  });
});

app.post("/register", async (req, res) => {
  const { email } = req.body;

  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, msg: "Email already exists" });
    }
    const newUser = await UserModel.create(req.body);
    newUser.save();
  
    res.status(201).json({ success: true, msg: "signup success" });
  } catch (error) {
    console.error("Error registering user:", error);
    res
      .status(500)
      .json({ success: false, msg: "Internal server error", err: error });
  }
});

app.listen(PORT, () => {
  console.log(`server started on port 5001`);
});
