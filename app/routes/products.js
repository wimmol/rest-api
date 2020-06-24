var productsController = require('../controllers/authcontroller.js');


module.exports = function(app, passport) {

    app.get('/products', productsController.productsList);



    function isLoggedAsAdmin(req, res, next) {


        if (req.isAuthenticated()) {
            return next();
        }

        res.redirect('/signin');

    }

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())
            return next();

        res.redirect('/signin');

    }


};