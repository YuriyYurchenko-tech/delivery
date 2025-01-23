const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          name: 'John',
          email: 'john@example.com',
          password: bcrypt.hashSync('123', 10),
          phone: '+799999999999',
          role: 'client',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          name: 'Jane',
          email: 'jane@example.com',
          password: bcrypt.hashSync('123', 10),
          phone: '+79998888888',
          role: 'courier',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Orders',
      [
        {
          title: 'KFC',
          price: 150,
          discount: '50%',
          img: 'https://avatars.mds.yandex.net/get-altay/901763/2a000001897e0fb82760c8b01125cb4a0da2/L_height',
          oldAddress: 'Moscow',
          isActive: 'true',
          courierId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Шаурма',
          price: 200,
          discount: '30%',
          img: 'https://lavash36.ru/upload/shop_1/1/8/5/item_185/item_185.jpg?202308111254',
          oldAddress: 'Saint Petersburg',
          isActive: 'true',
          courierId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Чебурек',
          price: 180,
          discount: '20%',
          img: 'https://images.gastronom.ru/nOTXs6BNGE40rXkVbIMx9CQT_MNsYQ5Q-onCGpoNkZk/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzU4NTNkNmVhLTYxOGYtNGYwMC1hMTFhLTc3NGVkMmFjNDRmMC5qcGc.webp',
          oldAddress: 'Novosibirsk',
          isActive: 'false',
          courierId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Пирожок с яйцом и луком',
          price: 300,
          discount: '40%',
          img: 'https://www.povarenok.ru/data/cache/2016nov/26/55/1823792_23124-710x550x.jpg',
          oldAddress: 'Yekaterinburg',
          isActive: 'true',
          courierId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: 'Гречка',
          price: 120,
          discount: '10%',
          img: 'https://images.gastronom.ru/zDAdG6JA5c46Iscb48zQHCOPKbfg4DmgwU_mRF-1JYQ/pr:recipe-cover-image/g:ce/rs:auto:0:0:0/L2Ntcy9hbGwtaW1hZ2VzLzVmZjU2YTYxLTk5YzktNDBiOC05MWU0LTYxZTk4NzNjYmI2ZS5qcGc.webp',
          oldAddress: 'Kazan',
          isActive: 'false',
          courierId: 2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
    await queryInterface.bulkInsert(
      'Carts',
      [
        {
          clientId: 1,
          orderId: 1,
          address: 'Moscow',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clientId: 1,
          orderId: 2,
          address: 'Orel',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          clientId: 2,
          orderId: 3,
          address: 'New York',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
