module.exports = function(app, order) {

    app.get('/orders', (res, req) => {
        order.findAll().then(
            res => {
                req.status(200).json(res);
            },
            err => {
                req.status(400).json(err);
            }
        )


    });

    app.get('/orders/:id', (res, req) => {
        order.findByPk(res.params.id).then(
            res => {
                req.status(200).json(res);
            },
            err => {
                req.status(400).json(err);
            }
        )

    });

    app.post('/orders', (res, req) => {

        const data  = res.body;
        if (data === "{}" || !data) {
            req.status(400).send("empty request");
        } else {
            order.create(data);
            req.status(200).json(data);
        }

    });

    app.put('/orders/:id', (req, res) => {

        const data  = req.body;
        if (data === "{}" || !data) {
            res.status(400).send("empty request");
        } else {
            order.update(data,
                { where: {id: req.params.id} });
            res.status(200).json(data);
        }
    });

    app.delete('/orders/:id', (req, res) => {

        order.findByPk(req.params.id).then(
            result => {
                if (result) {
                    order.destroy({where: {id: req.params.id}});
                    res.status(200).json(req.params.id);
                }
                else res.status(400).send("order is not found");
            },
            err => res.status(400).json(err)
        )

    });

};