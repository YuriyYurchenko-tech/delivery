'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Order, Cart }) {
      // this.hasMany(Order, { foreignKey: 'courierId', as: 'orders' });

      // this.belongsToMany(Order, {
      //   through: Cart,
      //   foreignKey: 'clientId',
      //   as: 'boughtOrders',
      // });
      this.hasMany(Cart, { foreignKey: 'clientId' });
      this.hasMany(Order, { foreignKey: 'courierId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phone: DataTypes.STRING,
      role: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
