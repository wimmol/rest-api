module.exports = function(app, orderedProduct) {

    app.get('/ordered-products', (res, req) => {
        orderedProduct.findAll().then(
            res => {
                req.status(200).json(res);
            },
            err => {
                req.status(400).json(err);
            }
        )


    });

    app.get('/ordered-products/:id', (res, req) => {
        orderedProduct.findByPk(res.params.id).then(
            res => {
                req.status(200).json(res);
            },
            err => {
                req.status(400).json(err);
            }
        )

    });

    app.post('/ordered-products', (res, req) => {

        const data  = res.body;
        if (data === "{}" || !data) {
            req.status(400).send("empty request");
        } else {
            orderedProduct.create(data);
            req.status(200).json(data);
        }

    });

    app.put('/ordered-products/:id', (req, res) => {

        const data  = req.body;
        if (data === "{}" || !data) {
            res.status(400).send("empty request");
        } else {
            orderedProduct.update(data,
                { where: {id: req.params.id} });
            res.status(200).json(data);
        }
    });

    app.delete('/ordered-products/:id', (req, res) => {

        orderedProduct.findByPk(req.params.id).then(
            result => {
                if (result) {
                    orderedProduct.destroy({where: {id: req.params.id}});
                    res.status(200).json(req.params.id);
                }
                else res.status(400).send("ordered product is not found");
            },
            err => res.status(400).json(err)
        )

    });

};