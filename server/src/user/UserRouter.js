const express = require("express");

const router = express.Router();

router.post("/api/1.0/register", async(req, res, next) => {
    res.send({message: "User created"})
})

module.exports = router;