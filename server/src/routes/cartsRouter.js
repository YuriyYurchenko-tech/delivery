const cartsRouter = require('express').Router();
const { Cart } = require('../../db/models');
const { User, Order } = require('../../db/models');
const verifyAccessToken = require('../middlewares/verifyAccessToken');

// get всех carts // v
cartsRouter.route('/').get(async (req, res) => {
  try {
    const allCarts = await Cart.findAll({
      include: [
        { model: Order, attributes: ['title', 'price', 'discount', 'img'] },
        { model: User, attributes: ['name', 'phone'] },
      ],
    });
    console.log(allCarts);

    res.json(allCarts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error cartRouter' });
  }
});

// создание new cart по order ID
cartsRouter.route('/:orderID').post(verifyAccessToken, async (req, res) => {
  try {
    const { address } = req.body; // 1
    const { id } = res.locals.user; // 3
    const { orderID } = req.params; // 2

    //
    const newCart = await Cart.create({
      address, //1
      clientId: id, //3
      orderId: orderID, //2
    });

    //
    res.status(201).json(newCart);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'error cartRouter' });
  }
});

// get cart по ID // v
cartsRouter
  .route('/:cartID')
  .get(async (req, res) => {
    try {
      const { cartID } = req.params;
      const myCart = await Cart.findOne({ where: { id: cartID } });
      res.send(myCart);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error cartRouter' });
    }
  })

  // удаление cart по ID // v
  .delete(async (req, res) => {
    try {
      const { cartID } = req.params;
      const myCart = await Cart.findOne({ where: { id: cartID } });
      const { orderId } = myCart;
      console.log(orderId);

      await Order.destroy({ where: { id: orderId } });
      await Cart.destroy({ where: { id: cartID } });

      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'error cartRouter' });
    }
  });

//
module.exports = cartsRouter;
