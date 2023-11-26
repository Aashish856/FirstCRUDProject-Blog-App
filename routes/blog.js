const express = require("express")
const { isLoggedIn } = require("../middlewares/isLoggedIn")
const router = express.Router()
// const {isLoggedIn} = require("../middlewares/isLoggedIn")
const {isAdmin} = require("../middlewares/isAdmin")
const {getAllBlogs, deleteAllBlogs, addBlog, getMyBlogs, deleteOneBlog, updateBlog} = require("../controllers/BlogController")
// const { route } = require("./auth")

router.get("/allBlogs", getAllBlogs)
router.delete("/deleteAllBlogs", isLoggedIn, isAdmin, deleteAllBlogs)


router.delete("/delete/:blogId", isLoggedIn, deleteOneBlog)
router.patch("/update/:blogId", isLoggedIn, updateBlog)

router.post("/addBlog", isLoggedIn, addBlog)
router.get("/myBlogs", isLoggedIn, getMyBlogs)


module.exports = router