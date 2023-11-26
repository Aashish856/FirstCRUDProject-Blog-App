const express = require('express');
const router = express.Router();

const {getAllUser, deleteAllUser} = require("../controllers/UserController")
const {isLoggedIn} = require("../middlewares/isLoggedIn")
const {isAdmin} = require("../middlewares/isAdmin")

router.get("/allUser", getAllUser)
router.get("/deleteAllUser", isLoggedIn, isAdmin, deleteAllUser)

module.exports = router