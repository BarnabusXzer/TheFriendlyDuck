const express = require("express");
const router = express.Router();

router.get("/dummy", (req, res) => {
    res.send("Hello");
});

module.exports = router;

// http://localhost:8080/dummy repsonds with Hello