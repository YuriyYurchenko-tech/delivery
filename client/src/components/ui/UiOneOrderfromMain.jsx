import {
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Modal,
} from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { Form, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import useUser from "../../hooks/useUser";
import { YMaps, Map, Placemark, SearchControl } from "@pbe/react-yandex-maps";


function UiOneOrderfromMain() {
  const {user} = useUser();
  const [showModal, setShowModal] = useState(false);
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([55.751574, 37.573856]);
  const [ymapsLoaded, setYmapsLoaded] = useState(false);
  

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  
  const [order, setOrder] = useState({
    title: "",
    price: "",
    discount: "",
    address: "",
  });
  
  const price = parseFloat(order.price);
  const discount = parseFloat(order.discount);

  const discountAmount = isNaN(price) || isNaN(discount) ? 'NaN' : (price - (price * discount) / 100).toFixed(2);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = () => {
    if (!ymapsLoaded) return;

    const ymaps = window.ymaps;
    ymaps
      .geocode(address)
      .then((result) => {
        const firstGeoObject = result.geoObjects.get(0);
        const coords = firstGeoObject.geometry.getCoordinates();
        setCoordinates(coords);
      })
      .catch((error) => {
        console.error("Ошибка геокодирования:", error);
      });
  };

  useEffect(() => {
    const ymaps = window.ymaps;
    if (ymaps) {
      setYmapsLoaded(true);
    }
  }, []);

  

  const { id } = useParams();

  // const [cart, setCart] = useState([])

  const submitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data, "===============");
    try {
      const response = await axiosInstance.post(`/carts/${id}`, data);
      if (response.status === 200) {
        alert("Заказ успешно добавлен!");
        // const newCart = await response.data;
        // setCart((prev) => [newCart, ...prev]);
        e.target.reset();
      }
    } catch (error) {
      console.error("Ошибка при добавлении заказа:", error);
      alert("Произошла ошибка при добавлении заказа.");
    }
  };
  useEffect(() => {
    axiosInstance(`/orders/${id}`).then((res) => setOrder(res.data));
  }, []);

  return (
    <Form
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        height: "100vh",
        marginTop: "50px",
      }}
    >
      <Card style={{ width: "18rem" }}>
        <Card.Img variant="top" src={order.img} />
        <Card.Body>
          <div className="text-center">
            <Card.Title style={{ fontSize: "25px", fontWeight: "bold" }}>
              {order.title}
            </Card.Title>
          </div>
        </Card.Body>
        <ListGroup className="list-group-flush">
          <div className="text-center">
            <ListGroup.Item>
              <i
                className="fas fa-map-marker-alt"
                style={{ marginRight: "8px", color: "#56B1F3" }}
              ></i>
              {order.oldAddress}
            </ListGroup.Item>
          </div>
          <ListGroup.Item name="price" style={{ fontWeight: "bold" }}>
            Цена: {order.price} руб
          </ListGroup.Item>
          <ListGroup.Item
            name="discount"
            style={{ display: "flex", alignItems: "center" }}
          >
            <img
              className="fit-picture"
              src="https://npk-photonica.com/upload/iblock/cbb/cbb4850e96b9b88e25938d4b992bfdda.jpg"
              alt="sale"
              style={{ height: "70px", marginRight: "8px" }}
            />
            <span style={{ color: "red", marginRight: "8px" }}>Скидка:</span>
            <span
              style={{ fontSize: "30px", fontWeight: "bold", color: "red" }}
            >
              {order.discount}
            </span>
          </ListGroup.Item>
          <ListGroup.Item style={{ fontWeight: "bold" }}>
            <span>Новая цена: </span>
            <span style={{ fontSize: "25px", color: "red" }}>
              {discountAmount}{" "}
            </span>
            <span>руб</span>
          </ListGroup.Item>
        </ListGroup>
        <Card.Body style={{ margin: "auto" }}>
          <Button
            variant="primary"
            onClick={handleShow}
            style={{
              width: "250px",
              fontSize: "16px",
              backgroundColor: "rgba(57, 57, 57, 1)",
              border: "solid #000000 1px",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Купить
          </Button>
        </Card.Body>

        <YMaps
          query={{
            apikey:
              "https://api-maps.yandex.ru/2.1?apikey=592baee2-f061-46c0-ae1b-a87733de9d67&lang=ru_RU",
          }}
        >
          <Map
            defaultState={{ center: coordinates, zoom: 15 }}
            width="100%"
            height="250px"
          >
            <Placemark geometry={coordinates} />
            <SearchControl
              options={{
                provider: "yandex#search",
                float: "right",
                noPlacemark: true,
              }}
            />
          </Map>
        </YMaps>
      </Card>

      <Modal show={showModal} onHide={handleClose}>
        <Form onSubmit={submitHandler}>
          <Modal.Header closeButton>
            <Modal.Title>Заполните данные для заказа</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FormGroup controlId="formBasicName">
              <FormLabel>
                Имя:<br></br> {user?.data?.name}
              </FormLabel>
            </FormGroup>

            <FormGroup controlId="formBasicPhone">
              <FormLabel>Телефон: {user?.data?.phone}</FormLabel>
            </FormGroup>

            <FormGroup controlId="formBasicAddress" className="email">
              <FormLabel>Адрес:</FormLabel>
              <FormControl
                name="address"
                type="text"
                placeholder="Введите ваш адрес"
              />
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button type="submit" variant="primary">
              Отправить
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Form>
  );
}

export default UiOneOrderfromMain;
