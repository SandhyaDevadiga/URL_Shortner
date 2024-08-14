const express = require("express");
const { connectToMongoDB } = require("./connect");
const urlRoute = require('./Routes/url');
const path= require('path');
const staticRoute =require('./Routes/staticRouter');
const URL = require('./models/url');
const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://127.0.0.1:27017/short-url')
  .then(() => console.log("MONGODB connected"));

app.set("view engine", "ejs");
app.set('views', path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended:false}))

app.use("/url", urlRoute);
app.use("/", staticRoute);

app.get('/test', async (req, res) => {
  const allUrls = await URL.find({});
  return res.render('home',{
    urls:allUrls,
  });
});


app.get('/url/:shortId', async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    { shortId },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    },
    { new: true } // Ensures the updated document is returned
  );

  if (!entry) {
    return res.status(404).json({ error: 'URL not found' });
  }

  res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));


// const express=require("express");
// const {connectToMongoDB}=require("./connect");
// const urlRoute=require('./Routes/url')
// const URL=require('./models/url')
// const app=express();
// const PORT=8001;

// connectToMongoDB( 'mongodb://127.0.0.1:27017/short-url')
// .then(()=>console.log("MONGODB connected"))

// app.use(express.json());

// app.use("/url", urlRoute);
// app.get('/:shortId', async(req,res)=>{
//  const shortId=req.params.shortId;
//  const entry=await URL.findOneAndUpdate({
//     shortId
//  },{
//    $push:{
//     visitHistory:{
//           timestamp:Date.now()
//     }
//    },
//  });
//  res.redirect(entry.redirectURL);
// });
// app.listen(PORT, ()=> console.log(`Server Started at PORT:${PORT}`));
