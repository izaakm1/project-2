var authController = require('../controllers/authcontroller.js');
 
 
module.exports = function(app, passport) {
 
 
    app.get('/signup', authController.signup);
 
 
    app.get('/bussiness/signin', authController.signin);
 
 
    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/setevents',
 
            failureRedirect: '/signup'
        }
 
    ));
 
 
    app.get('/setevents', isLoggedIn, authController.setevents);
 
 
 
    app.get('/logout', authController.logout);
 
 
    app.post('/business/signin', passport.authenticate('local-signin', {
            successRedirect: '/setevents',
 
            failureRedirect: '/business/signin'
        }
 
    ));
 
 
    function isLoggedIn(req, res, next) {
 
        if (req.isAuthenticated())
 
            return next();
 
        res.redirect('/signin');
 
    }
 
}