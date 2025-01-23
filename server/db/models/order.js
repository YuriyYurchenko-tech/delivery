'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Cart }) {
      // this.belongsTo(User, { foreignKey: 'courierId', as: 'courier' });
      // this.belongsToMany(User, {
      //   through: Cart,
      //   foreignKey: 'orderId',
      //   as: 'buyByClients',
      // });
      this.hasMany(Cart, { foreignKey: 'orderId' });
      this.belongsTo(User, { foreignKey: 'courierId' });
    }
  }
  Order.init(
    {
      title: DataTypes.STRING,
      price: DataTypes.INTEGER,
      discount: DataTypes.STRING,
      img: DataTypes.STRING,
      oldAddress: DataTypes.STRING,
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      courierId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Order',
    },
  );
  return Order;
};
