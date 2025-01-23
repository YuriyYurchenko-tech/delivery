import React from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

export default function AccountLoginPage({ signInHandler }) {
  return (
    <Row
    style={{
      display: "flex",
      alignItems: "flex-start",
      height: "100vh",
    }}>
      <Col md={{ span: 6, offset: 3 }} className="mt-5" style={{ fontWeight: "600"}} >
        <h3 className="text-center" style={{ fontWeight: "600"}}>Войти в учетную запись</h3>
        <Form onSubmit={signInHandler} style={{marginTop: "30px"}}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control name="email" type="email" placeholder="Введите email" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Пароль</Form.Label>
            <Form.Control name="password" type="password" placeholder="Введите пароль" />
          </Form.Group>
          <div className="text-center">
          <Button type="submit" style={{ width: "250px", fontSize: "16px", backgroundColor: "rgba(57, 57, 57, 1)", border: "solid #000000 1px", transition: "transform 0.2s", marginTop: "15px"}} onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")} className="w-50">
            Войти
          </Button>
          </div>
        </Form>
      </Col>
    </Row>
  );
}