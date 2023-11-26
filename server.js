const express = require("express")
const mongoose = require("mongoose")
const app = express()

require('dotenv').config();
const uri = "mongodb+srv://" + process.env.MONGOID + ":" + process.env.MONGOPASS + "@cluster0.ick6x9i.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri);

const authRouter = require("./routes/auth")
const userRouter = require("./routes/user")
const blogRouter = require("./routes/blog")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Welcome to blogs")
})

app.use((req, res, next) => {
    console.log("Request From The Client: ")
    console.log("Request.BODY")
    console.log(req.body);
    console.log("Request.HEADERS")
    console.log(req.headers);
    next();
})

app.use("/auth", authRouter)
app.use("/user", userRouter)
app.use("/blog", blogRouter)


app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})