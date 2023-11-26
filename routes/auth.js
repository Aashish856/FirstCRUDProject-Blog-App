const express = require('express');
const router = express.Router();

const {login, signUp} = require("../controllers/AuthController");

router.post("/login", login)
router.post("/signUp", signUp)

module.exports = router