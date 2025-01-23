import React from "react";
import { NavLink } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

export default function AccountNewPage({ user, signUpHandler }) {
  return (
    <Row       
    style={{
      display: "flex",
      alignItems: "flex-start",
      height: "100vh",
    }}>
  <Col md={{ span: 6, offset: 3 }} className="mt-5" style={{ fontWeight: "600", marginBottom: "40px"}}>
    <h3 className="text-center mb-4"style={{ fontWeight: "600", marginBottom: "40px"}}>Регистрация</h3>
    <Form onSubmit={signUpHandler} className="shadow p-4 rounded bg-light">
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Имя</Form.Label>
        <Form.Control name="name" type="text" placeholder="Введите имя" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email</Form.Label>
        <Form.Control name="email" type="email" placeholder="Введите email" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="hashpass">
        <Form.Label>Пароль</Form.Label>
        <Form.Control name="password" type="password" placeholder="Введите пароль" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Телефон</Form.Label>
        <Form.Control name="phone" type="tel" placeholder="Введите телефон" required />
      </Form.Group>
      <Form.Group className="mb-3" controlId="role">
        <Form.Label>Кто вы?</Form.Label>
        <Form.Select name="role" aria-label="Default select example" required>
          <option value="">Выберите роль</option>
          <option value="client">Клиент</option>
          <option value="courier">Курьер</option>
        </Form.Select>
      </Form.Group>
      <div className="text-center">
      <Button type="submit" variant="info" style={{ width: "250px", fontSize: "16px", backgroundColor: "rgba(57, 57, 57, 1)", border: "solid #000000 1px", transition: "transform 0.2s", color: "white" }} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} className="w-50">
        Регистрация
      </Button>
      </div>
    </Form>
  </Col>
</Row>

  );
}
