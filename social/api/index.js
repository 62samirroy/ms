const express=require("express")
const app=express();
const mongoose=require("mongoose")
const dotenv=require("dotenv");
const helmet=require("helmet");
const morgan = require('morgan');
const { json } = require("stream/consumers");
const userRoute=require("./routes/users")
const userAuth=require("./routes/auth")
const postRoute=require("./routes/posts")
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const multer = require("multer");
// const userRoute = require("./routes/users");
// const authRoute = require("./routes/auth");
// const router = express.Router();
const path = require("path");



dotenv.config();
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Your code here, such as starting your Express server
  })
  .catch(error => {
    console.error('Error connecting to MongoDB:', error);
  });

  app.use("/images", express.static(path.join(__dirname, "public/images")));

  // Corrected middleware usage
app.use(express.json()); // Use express.json() instead of express,json()
app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    // Use the original filename provided by multer
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});







app.use("/api/auth",userAuth)
app.use("/api/users",userRoute)
app.use("/api/posts",postRoute)
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);



app.listen(8800,()=>{

    console.log("backent server is raning");

})