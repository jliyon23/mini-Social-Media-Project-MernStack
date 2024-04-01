
# Mini Social Media - MERN STACK 
https://waywego.vercel.app/


---

# WayWeGo

WayWeGo is a mini social media website where users can share their travel experiences by uploading photos as posts. Built using the MERN stack, WayWeGo features JWT authentication for secure user login, Cloudinary integration for seamless image uploads, and Tailwind CSS for a sleek and modern UI design.

## Screenshots

<img width="680" alt="login" src="https://github.com/jliyon23/mini-Social-Media-Project-MernStack/assets/120583161/56f7a9b0-b267-4f58-92e0-8b2b88f930a9">
<img width="569" alt="signup" src="https://github.com/jliyon23/mini-Social-Media-Project-MernStack/assets/120583161/9ef39237-5670-4c92-8a9f-7d10d8227566">
<img width="947" alt="home" src="https://github.com/jliyon23/mini-Social-Media-Project-MernStack/assets/120583161/678346fc-7807-423b-a2ed-0662b7a4f613">
<img width="404" alt="newpost" src="https://github.com/jliyon23/mini-Social-Media-Project-MernStack/assets/120583161/ab7280e9-5bfe-4c8c-84f0-6af3caa4c898">


## Features:
- **User Authentication**: Secure user authentication using JSON Web Tokens (JWT).
- **Image Upload**: Cloudinary-based image upload functionality allows users to easily share their travel photos.
- **Responsive Design**: Built with Tailwind CSS, the website is responsive and optimized for various screen sizes.
- **User Profiles**: Each user has their own profile page where they can view and manage their posts.
- **Explore Page**: Discover new travel experiences by browsing through posts from other users.

## Technologies Used:
- MongoDB
- Express.js
- React.js
- Node.js
- JSON Web Tokens (JWT)
- Cloudinary
- Tailwind CSS

## Getting Started:
To run the project locally, follow these steps:
1. Clone the repository.
    
    `git clone https://github.com/jliyon23/mini-Social-Media-Project-MernStack.git`
2. Install dependencies using 
    
    In server,

    `cd server`
    
    `npm install`

    `npm start`

    In client,
    
    `cd client`

    `npm install`

    `npm run dev`
3. Set `.env`

    `PORT=`

    `MONGO_DB=`

    `JWT_SECRET=`
4. Configure Cloudinary credentials

    `client/src/components/Head.jsx`
5. Start the server using `npm run dev`.
6. Navigate to `http://localhost:5173` in your browser to view the website.

## Contributing:
Contributions are welcome! Feel free to open an issue or submit a pull request.

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
