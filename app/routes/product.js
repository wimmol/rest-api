var productsController = require('../controllers/authcontroller.js');


module.exports = function(app, product) {

    app.get('/products', (req, res) => {
        product.findAll().then(
            result => {
                res.status(200).json(result);
            },
            err => {
                res.status(400).json(err);
            }
        )
    });

    app.get('/products/:id', (req, res) => {
        product.findByPk(req.params.id).then(
            result => {
                res.status(200).json(result);
            },
            err => {
                res.status(400).json(err);
            }
        )

    });

    app.post('/products', (req, res) => {

        const data  = req.body;
        if (data === "{}" || !data) {
            res.status(400).send("empty request");
        } else {
            product.create(data);
            res.status(200).json(data);
        }
    });

    app.put('/products/:id', (req, res) => {

        const data  = req.body;
        if (data === "{}" || !data) {
            res.status(400).send("empty request");
        } else {
            product.update(data,
                { where: {id: req.params.id} });
            res.status(200).json(data);
        }
    });

    app.delete('/products/:id', (req, res) => {

        product.findByPk(req.params.id).then(
            result => {
                if (result) {
                    product.destroy({where: {id: req.params.id}});
                    res.status(200).json(req.params.id);
                }
                else res.status(400).send("product is not found");
            },
            err => res.status(400).json(err)
        )

    });

};