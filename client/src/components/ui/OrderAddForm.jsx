import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function OrderAddForm({ submitHandler }) {
  return (
    <Container>
      <Row className="justify-content-center" style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        marginTop: "20px",
      }}>
        <Col md={5}>
          <h3 className="text-center" style={{ fontWeight: "600", marginBottom: "40px"}}>Новый заказ</h3>
          <Form onSubmit={submitHandler} className="shadow p-4 rounded bg-light">
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control name="title" type="text" placeholder="Order title" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control name="price" type="text" placeholder="Price" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control name="discount" type="text" placeholder="Discount (%)" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Image URL</Form.Label>
              <Form.Control name="img" type="text" placeholder="Image URL" />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Address</Form.Label>
              <Form.Control name="oldAddress" type="text" placeholder="Order address" />
            </Form.Group>
            <div className="text-center">
              <Button type="submit" style={{ width: "250px", fontSize: "16px", backgroundColor: "rgba(57, 57, 57, 1)", border: "solid #000000 1px", transition: "transform 0.2s" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} className="w-50">
                Создать
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
