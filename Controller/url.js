const URL = require('../models/url');

function generateShortId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let shortId = '';
    for (let i = 0; i < 8; i++) {
        shortId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return shortId;
}

async function handlegenerateNewShortURL(req, res) {
    const body = req.body;
    if (!body.url) return res.status(400).json({ error: 'URL is required' });

    const shortId = generateShortId();
    await URL.create({
        shortId: shortId,
        redirectURL: body.url,
        visitHistory: [],
    });

    return res.render('home', {
        id:shortId,
    })
    
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId });

    if (!result) return res.status(404).json({ error: 'URL not found' });

    return res.json({ 
        totalClicks: result.visitHistory.length, 
        analytics: result.visitHistory 
    });
}

module.exports = {
    handlegenerateNewShortURL,
    handleGetAnalytics,
};



// const {shortid}=require("shortid");
// const URL=require('../models/url');

// async function handlegenerateNewShortURL(req,res){
//    const body=req.body;
//    if(!body.url) return res.status(400).json({error: 'url is required'});
//     const shortId=shortid();
//    await URL.create({
//     shortId:shortId,
//     redirectURL:body.url,
//     visitHistory:[],
//    });
//    return res.json({id:shortId});
// }

// async function handleGetAnalytics(req, res){
//     const shortId=req.params.shortId;
//     const result=await URL.findOne({shortId});
//     return res.json({ totalClicks: result.visitHistory.length, 
//         analytics:result.visitHistory
// });
// }
// module.exports={
//     handlegenerateNewShortURL,
//     handleGetAnalytics, 
// }