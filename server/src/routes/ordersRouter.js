/* eslint-disable quotes */
const ordersRouter = require('express').Router();
const { Order } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');


//
// get все orders // v
ordersRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const allOrders = await Order.findAll();
      res.json(allOrders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error orderRouter1' });
    }
  })

  // создание order
  .post(verifyAccessToken, async (req, res) => {
    const { id } = res.locals.user;

    try {
      const { title, price, discount, img, oldAddress } = req.body;

      const newOrder = await Order.create({
        title,
        price,
        discount,
        img,
        oldAddress,
        courierId: id,
      });
      res.status(200).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error orderRouter' });
    }
  });

//
// get order по ID
ordersRouter
  .route('/:orderID')
  .get(async (req, res) => {
    try {
      const { orderID } = req.params;
      const myOrder = await Order.findOne({ where: { id: orderID } });
      res.send(myOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error orderRouter' });
    }
  })

  // редактирование order по ID
  .patch(async (req, res) => {
    try {
      const { orderID } = req.params;
      const { title, price, discount, img, oldAddress, isActive } = req.body;
      await Order.update(
        {
          title,
          price,
          discount,
          img,
          oldAddress,
          isActive,
        },
        { where: { id: orderID } },
      );
      const updatedOrder = await Order.findByPk(orderID);
      res.json(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error orderRouter' });
    }
  })
  // удаление order по ID
  .delete(async (req, res) => {
    try {
      const { orderId } = req.params;
      await Order.destroy({ where: { id: orderId } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error orderRouter' });
    }
  });

//
module.exports = ordersRouter;
