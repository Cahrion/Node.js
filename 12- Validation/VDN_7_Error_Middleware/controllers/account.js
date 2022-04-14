const User  = require("../models/user");
const bcrypt = require("bcrypt");
const sgMail = require('@sendgrid/mail');
const crypto = require("crypto");

sgMail.setApiKey("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");

exports.getLogin = (req, res, next) => {
    var errorMessage   = req.session.errorMessage;
    delete req.session.errorMessage;
    var complateMessage   = req.session.complateMessage;
    delete req.session.complateMessage;
    
    res.render('account/login', {
        path: '/login',
        title: 'Login',
        errorMessage: errorMessage,
        complateMessage: complateMessage
    });
}

exports.postLogin = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user=>{
            if(user){
                bcrypt.compare(password, user.password)
                    .then(result =>{
                        if(result){
                            req.session.user = user;
                            req.session.isAuthenticated = true;
                            return req.session.save(function (err){
                                var url = req.session.redirectTo || "/";
                                delete req.session.redirectTo;
                                return res.redirect(url);
                            })
                        }else{
                            req.session.errorMessage = "Şifre uyuşmuyor.";
                            req.session.save(function(err) {
                                console.log(err);
                                return res.redirect('/login');
                            });
                        }
                    })
            }else{
                req.session.errorMessage = "Bu mail adresi ile bir kayıt bulunamamıştır.";
                req.session.save(function(err) {
                    console.log(err);
                    return res.redirect('/login');
                });
            }
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.getRegister = (req, res, next) => {
    var errorMessage   = req.session.errorMessage;
    delete req.session.errorMessage;

    res.render('account/register', {
        path: '/register',
        title: 'Register'
    });
}

exports.postRegister = (req, res, next) => {
    const name      = req.body.name;
    const email     = req.body.email;
    const password  = req.body.password;

    User.findOne({email: email})
        .then(user=>{
            if(user){
                req.session.errorMessage = "Bu mail adresi ile daha önce kayıt olunmuştur.";
                req.session.save(function(err) {
                    console.log(err);
                    return res.redirect("/register");
                });
            }
            return bcrypt.hash(password, 10);
        })
        .then(hashedPassword=>{
            const newUser = new User({
                name: name,
                email: email,
                password: hashedPassword,
                cart: { items: [] }
            });
            return newUser.save();
        })
        .then(()=>{
            res.redirect('/login');

            const msg = {
                to: email,
                from: 'info@sadikturan.com',
                subject: 'Hesap Oluşturuldu.',
                subject: 'Sending with SendGrid is Fun',
                html: '<h1>Hesabınız başarılı bir şekilde oluşturuldu.</h1>'
            };

            sgMail.send(msg);
        })
        .catch(err=>{
            console.log(err.message);
        })
}

exports.getReset = (req, res, next) => {
    res.render('account/reset', {
        path: '/reset',
        title: 'Reset'
    });
}

exports.postReset = (req, res, next) => {
    const email = req.body.email;

    crypto.randomBytes(32, (err, buffer)=>{
        if(err){
            console.log(err);
            return res.redirect("/reset-password");
        }
        const token = buffer.toString("hex");
        User.findOne({email: email})
            .then(user=>{
                if(!user){
                    req.session.errorMessage = "Mail Adresi bulunamadı";
                    req.session.save(function(err) {
                        console.log(err);
                        return res.redirect("/reset-password");
                    });
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 3600000;
                return user.save();
            }).then(result => {
                res.redirect("http://localhost:3000/reset-password/" + token);
                const msg = {
                    to: email,
                    from: 'info@sadikturan.com',
                    subject: 'Parola Reset',
                    html: `
                        <p> Parolanızı güncellemek için aşağıdaki linke tıkalyınız.</p>
                        <p>
                            <a href="http://localhost:3000/reset-password/${token}"
                                Reset Password
                            </a>
                        </p>
                    `
                };
                sgMail.send(msg);
            }).catch(err=>{
                console.log(err);
            });

    });
}
exports.getNewPassword = (req, res, next) => {
    var errorMessage   = req.session.errorMessage;
    delete req.session.errorMessage;
    const token = req.params.token;
    User.findOne({resetToken: token, resetTokenExpiration: {
        $gt: Date.now()
    }})
    .then(user=>{

        res.render('account/new-password', {
            path: '/new-password',
            title: 'New Password',
            errorMessage: errorMessage,
            userId: user._id,
            passwordToken: token
        });
    }).catch(err =>{
        console.log(err);
    })
}

exports.postNewPassword = (req, res, next) => {
    const newPassword   = req.body.password;
    const token         = req.body.passwordToken;
    const userId        = req.body.userId;
    let _user;
    User.findOne({
        _id: userId,
        resetToken: token, 
        resetTokenExpiration: { $gt: Date.now() }
    })
    .then(user=>{
        _user = user;
        return bcrypt.hash(newPassword,10);
    })
    .then(hashedPassword=>{
        _user.password = hashedPassword;
        _user.resetToken = undefined;
        _user.resetTokenExpiration = undefined;
        return _user.save();
    })
    .then(()=>{
        res.redirect("/login");
    })
    .catch(err =>{
        console.log(err);
    })
}

exports.getLogout = (req, res, next) => {
    req.session.destroy(err =>{
        console.log(err);
        res.redirect("/");
    });
}
