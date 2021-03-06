const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser');

const adminRoutes   = require('./routes/admin');
const userRoutes    = require('./routes/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use((req,res)=>{
    res.status(404);
    res.send('<h1>Page not found</h1>');
});

app.listen(3000, ()=>{
    console.log("listening on port 3000");
});