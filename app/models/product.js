module.exports = function(sequelize, Sequelize)  {

    var Product = sequelize.define('product', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            notEmpty: true
        },
        description: {
            type: Sequelize.TEXT
        },
        quantity: {
            type: Sequelize.INTEGER
        }
    });

    return Product;

};