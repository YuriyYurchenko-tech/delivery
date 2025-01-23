/* eslint-disable quotes */
const usersRouter = require("express").Router();
const { User } = require("../../db/models");

//
// get все user
usersRouter
  .route("/")
  .get(async (req, res) => {
    try {
      const allOrders = await User.findAll();
      res.json(allOrders);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error usersRouter" });
    }
  })
  // создание user
  .post(async (req, res) => {
    try {
      const { name, email, phone, password, role } = req.body;
      const newOrder = await User.create({
        name,
        email,
        phone,
        password,
        role,
      });
      res.status(201).json(newOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error usersRouter" });
    }
  });

//
// get user по ID
usersRouter
  .route("/:orderID")
  .get(async (req, res) => {
    try {
      const { orderID } = req.params;
      const myOrder = await User.findOne({ where: { id: orderID } });
      res.send(myOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error usersRouter" });
    }
  })
  // редактирование user по ID
  .patch(async (req, res) => {
    try {
      const { orderID } = req.params;
      const { name, email, tel, password } = req.body;
      await User.update(
        {
          name,
          email,
          tel,
          password,
        },
        { where: { id: orderID } }
      );
      const updatedOrder = await User.findByPk(orderID);
      res.json(updatedOrder);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error usersRouter" });
    }
  })
  // удаление user по ID
  .delete(async (req, res) => {
    try {
      const { orderID } = req.params;
      await User.destroy({ where: { id: orderID } });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "error usersRouter" });
    }
  });

//
module.exports = usersRouter;
