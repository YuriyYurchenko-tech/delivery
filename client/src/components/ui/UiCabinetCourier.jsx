import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function UiCabinetCourier({cart}) {
  return (
    <>
      <div
  style={{
    display: "flex",
    flexDirection: "column", 
    alignItems: "center", 
    marginTop: "30px",
  }}
>
  <h2 style={{ marginBottom: "40px" }}>Новый заказ</h2>
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={cart.Order.img} style={{ height: "180px", objectFit: "cover" }}/>
    <Card.Body>
      <Card.Title>{cart.address}</Card.Title>
  
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item>{cart.Order.title}</ListGroup.Item>
      <ListGroup.Item>{cart.User.name}</ListGroup.Item>
      <ListGroup.Item>{cart.User.phone}</ListGroup.Item>
    </ListGroup>
  </Card>
</div>
    </>
  );
}

export default UiCabinetCourier;
