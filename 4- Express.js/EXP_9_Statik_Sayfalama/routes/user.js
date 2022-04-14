const express   = require('express');
const router    = express.Router();
const path      = require('path');

router.get("/",(req,res,next)=>{
    res.sendFile(path.join(__dirname, '../', 'views', 'index.html'));
});

router.use((req,res)=>{
    res.status(404);
    res.sendFile(path.join(__dirname, '../', 'views', '404.html'));
});
module.exports  = router;