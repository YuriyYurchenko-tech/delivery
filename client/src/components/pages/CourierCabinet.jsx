import React, { useEffect, useState } from "react";
import UiCabinetCourier from "../ui/UiCabinetCourier";
import { Form, useParams } from "react-router-dom";
import axios from "axios";
import { Col, Row } from "react-bootstrap";
import axiosInstance from "../api/axiosInstance";

export default function CourierCabinet() {
  const [cart, setCart] = useState([]);

  const getCart = async () => {
    try {
      const res = await fetch("/api/carts");
      if (res.status === 200) {
        const cartFDb = await res.json();
        setCart(cartFDb);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getCart();
  }, []);
  return (
    <>
      <Row
        className="mt-4"
        style={{ display: "flex", justifyContent: "space-evenly" }}
      >
        {cart.map((el) => (
          <Col
            md={4}
            lg={3}
            className="mb-4"
            key={el.id}
            style={{
              justifyContent: "space-between",
              boxSizing: "content-box",
            }}
          >
            <UiCabinetCourier  key={el.id} cart={el} />
          </Col>
        ))}
      </Row>
    </>
  );
}
