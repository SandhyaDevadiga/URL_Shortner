const express=require('express');
const {handlegenerateNewShortURL, handleGetAnalytics}=require("../Controller/url")


const router=express.Router();
router.post('/', handlegenerateNewShortURL);
router.get('/analytics/:shortId',handleGetAnalytics)
module.exports=router;