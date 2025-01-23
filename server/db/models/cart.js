'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, User }) {
      this.belongsTo(Order, { foreignKey: 'orderId' });
      this.belongsTo(User, { foreignKey: 'clientId' });
    }
  }
  Cart.init(
    {
      clientId: DataTypes.INTEGER,
      orderId: DataTypes.INTEGER,
      address: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Cart',
    },
  );
  return Cart;
};
