import React from "react";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from '../../img/Group.png';

export default function NavBar({ user, logoutHandler }) {
  const location = useLocation();
  const navigate = useNavigate();

  const [showAddButton, setShowAddButton] = useState(false);

  useEffect(() => {
    if (location.pathname === "/couriercabinet") {
      setShowAddButton(true);
    } else {
      setShowAddButton(false);
    }
  }, [location.pathname]);

  return (
    <Navbar style={{ backgroundColor: "rgba(57, 57, 57, 1)", height: "70px" }} expand="lg">
  <Container className="d-flex align-items-center justify-content-between">
    <NavLink to="/" className="navbar-brand text-white">
    <img src={logo} alt="Logo" style={{ height: "50px" }} />
    </NavLink>
    <Navbar.Toggle aria-controls="navbar-nav" />
    <Navbar.Collapse id="navbar-nav">
      <Nav className="me-auto d-flex align-items-center">
        <NavLink to="/" className="nav-link text-white" style={{ marginLeft: "25px" }}>
          Главная
        </NavLink>
        {showAddButton && (
          <span className="nav-link">
            <Button
              onClick={() => navigate("/orders/add")}
              variant="light"
              style={{ marginLeft: "15px" }}
            >
              Создать заказ
            </Button>
          </span>
        )}
      </Nav>

      <Nav className="d-flex align-items-center">
        {user.data && user.data.role === "courier" && (
          <NavLink to="/couriercabinet" className="nav-link text-white" style={{ marginRight: "30px" }}>
            Кабинет курьера
          </NavLink>
        )}
        {!user.data ? (
          <>
            <NavLink to="/account/login" className="nav-link text-white">
              Войти
            </NavLink>
            <NavLink to="/account/new" className="nav-link text-white">
              Регистрация
            </NavLink>
          </>
        ) : (
          <>
            <span className="nav-link text-white">
              {user.data ? user.data.name : "Гость"}
            </span>
            <Button
              onClick={() => {
                logoutHandler();
                navigate("/");
              }}
              variant="light"
              style={{ marginLeft: "15px" }}
            >
              Выйти
            </Button>
          </>
        )}
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
}
