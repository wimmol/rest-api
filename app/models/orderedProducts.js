module.exports = function(sequelize, Sequelize)  {

    var OrderedProducts = sequelize.define('orderedProducts', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        productId: {
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.TEXT
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    return OrderedProducts;

};