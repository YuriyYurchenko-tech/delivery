import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Row } from "react-bootstrap";
import OrderAddForm from "../ui/OrderAddForm";
import axiosInstance from "../api/axiosInstance";

const submitHandler = async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData);

  try {
    const response = await axiosInstance.post('/orders', data);
    if (response.status === 200) {
      alert('Заказ успешно добавлен!');
      e.target.reset();
    }
  } catch (error) {
    console.error('Ошибка при добавлении заказа:', error);
    alert('Произошла ошибка при добавлении заказа.');
  }
};


export default function AddNewOrderPage() {
  return (
    <>
    <OrderAddForm submitHandler={submitHandler} />
    </>
  );
}
