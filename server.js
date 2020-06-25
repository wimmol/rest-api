const express = require('express');
const app = express();
const passport = require('passport');
const session = require('express-session');
const bodyParser = require('body-parser');
const env = require('dotenv');
const exphbs = require('express-handlebars');


//For BodyParser
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());


// For Passport
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


//For Handlebars
app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');



app.get('/', function(req, res) {

    res.send('main page');

});

//Models
const models = require("./app/models");

//Routes
const authRoute = require('./app/routes/auth.js')(app, passport);

const productsRoute = require('./app/routes/product.js')(app, models.product);

const ordersRoute = require('./app/routes/order.js')(app, models.order);

const orderedProductsRoute = require('./app/routes/orderedProducts.js')(app, models.orderedProducts);


//load passport strategies
require('./app/config/passport/passport.js')(passport, models.user);


//Sync Database
models.sequelize.sync().then(function() {

    console.log('DB works')


}).catch(function(err) {

    console.log(err, "Something went wrong with the Database Update!")

});

const port = 3002;
app.listen(port, function(err) {

    if (!err) {
        console.log(`Server listens on port ${port}`);
        console.log(`localhost:${port}/dashboard`)
    }
    else console.log(err)

});