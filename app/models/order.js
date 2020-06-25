module.exports = function(sequelize, Sequelize)  {

    var Order = sequelize.define('order', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            type: Sequelize.TEXT
        },
        cost: {
            type: Sequelize.INTEGER
        }
    });

    return Order;

};