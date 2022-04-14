const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const path = require('path');

app.set('view engine', 'pug');
app.set('views', './views');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/shop');

const mongoose = require('mongoose');

const errorController = require('./controllers/errors');

const User = require('./models/user');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findOne({
        name: 'icabikirgiz'
    })
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => { console.log(err) });
})


app.use('/admin', adminRoutes);
app.use(userRoutes);

app.use(errorController.get404Page);


mongoose.connect('mongodb+srv://icabikirgiz:azIy9QmGgGXLw09i@cluster0.enatg.mongodb.net/node-app?retryWrites=true&w=majority')
    .then(() => {
        console.log('connected to mongodb');
        
        User.findOne({name: 'icabikirgiz'})
        .then(user => {
            if (!user) {
                user = new User({
                    name: "icabikirgiz",
                    email: "icabikrz@gmail.com",
                    cart: {
                        items: []
                    }
                });
                return user.save();
            }
            return user;
        })
        .then(user => {
            console.log(user);
            app.listen(3000);
        })
        .catch(err => { console.log(err) });
    })
    .catch(err => {
        console.log(err);
    })