var authController = require('../controllers/authcontroller.js');


module.exports = function(app, passport) {

    app.get('/signup', authController.signup);


    app.get('/signin', authController.signin);


    app.post('/signup', passport.authenticate('local-signup', {
            successRedirect: '/dashboard',

            failureRedirect: '/signup'
        }

    ));

    app.post('/signin', passport.authenticate('local-signin', {
            successRedirect: '/dashboard',

            failureRedirect: '/signin'
        }

    ));

    app.get('/dashboard', isLoggedIn, authController.dashboard);

    app.post('/dashboard', (req, res) =>{
        if (req.body.logout) {
            authController.logout(req, res);
        }
        if (req.body.products) {
            res.redirect('/products');

        }
    });


    app.get('/logout',authController.logout);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }

}