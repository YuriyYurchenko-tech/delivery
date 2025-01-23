import React from "react";
import Container from 'react-bootstrap/Container';
import { Outlet } from 'react-router-dom';
import Loader from './hoc/Loader';
import NavBar from './ui/NavBar';

export default function Layout({ user, logoutHandler }) {
  return (
    <div
      style={{
        backgroundImage: "url(https://img.freepik.com/free-vector/white-abstract-background_23-2148549662.jpg?t=st=1728028132~exp=1728031732~hmac=8673bfd65fe06190464bbf1c8cf005dbcaa9615ebb26b069949fe1c9579c56ad&w=1380)",
        backgroundSize: "cover",
        minHeight: "100vh", 
        padding: "0",
        margin: "0",
        fontFamily: "'Roboto', sans-serif",
      }}
    >
      <Loader showSpinner={user.status === 'fetching'}>
        <NavBar user={user} logoutHandler={logoutHandler} style={{fontWeight: "700"}} />
        <Container className="py-4" style={{ backgroundColor: "rgba(255, 255, 255, 0.7)" }}> {/* semi-transparent background for content */}
          <Outlet />
        </Container>
      </Loader>
    </div>
  );
}