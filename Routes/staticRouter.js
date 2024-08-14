
const express = require('express');
const router = express.Router();
const URL = require('../models/url'); 

router.get('/', async (req, res) => {
    try {
        const allurls = await URL.find({});
        return res.render("home", {
            urls: allurls,
        });
    } catch (err) {
        console.error("Error fetching URLs:", err);
        return res.status(500).send("Internal Server Error");
    }
});

module.exports = router;