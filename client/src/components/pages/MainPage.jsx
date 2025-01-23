/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Col, Row } from "react-bootstrap";
import UiCardsOnMain from "../ui/UiCardsOnMain";

export default function MainPage({ user }) {
  const [orders, setOrders] = useState([]);

  //
  const deleteHandler = async (id) => {
    await axios.delete(`/api/orders/${id}`);
    setOrders((prev) => prev.filter((el) => el.id !== id));
  };

//
const createCartHandler = async () => {
  const newCart = await axios.post
}

  //
  const getOrder = async () => {
    try {
      const res = await fetch("/api/orders");
      if (res.status === 200) {
        const orderFromDb = await res.json();
        setOrders(orderFromDb);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
<>
  <Row className="mt-4" style={{display: "flex", justifyContent: "space-evenly"}}>
    {orders.map((el) => (
      <Col md={4} lg={3} className="mb-4" key={el.id} style={{ justifyContent: "space-between", boxSizing: 'content-box' }}>
        <UiCardsOnMain order={el} user={user}></UiCardsOnMain>
      </Col>
    ))}
  </Row>
</>

  );
}
