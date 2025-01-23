import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { YMaps, Map, Placemark, SearchControl } from "@pbe/react-yandex-maps";

function UiCardsOnMain({ user, order }) {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState([55.751574, 37.573856]);
  const [ymapsLoaded, setYmapsLoaded] = useState(false);

  const price = parseFloat(order.price);
  const discount = parseFloat(order.discount);


  const discountAmount = isNaN(price) || isNaN(discount) ? 'NaN' : (price - (price * discount) / 100).toFixed(2);




  // const discountAmount = (order.price * order.discount) / 100;
  // const finalPrice = (order.price - discountAmount).toString();
  // console.log(typeof finalPrice, "that is discount");

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

  return (
    <Form>
  <Card
    style={{
      border: "1px solid black",
      width: "22rem", 
      backgroundColor: "#f8f9fa",
      color: "black",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      transition: "transform 0.2s",
      marginBottom: "30px",
    }}
    onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
    onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
  >
    <Card.Img 
      variant="top" 
      src={order.img} 
      style={{ height: "180px", objectFit: "cover" }} 
    />
    <Card.Body>
    <div className="text-center">
      <Card.Title name="title" style={{ fontSize: "25px", fontWeight: "bold"}}>{order.title}</Card.Title>
      <Card.Text name="address">
      <i className="fas fa-map-marker-alt" style={{ marginRight: '8px', color: '#56B1F3' }}></i>
        {order.oldAddress}
        </Card.Text>
      </div>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroup.Item
        name="price"
        style={{ fontWeight: "bold" }}
      >
        Цена: {order.price} руб
      </ListGroup.Item>
      <ListGroup.Item name="discount" style={{ display: 'flex', alignItems: 'center' }}>
  <img 
    className="fit-picture" 
    src="https://npk-photonica.com/upload/iblock/cbb/cbb4850e96b9b88e25938d4b992bfdda.jpg" 
    alt="sale" 
    style={{ height: "70px", marginRight: '8px' }} 
  />
  <span style={{ color: "red", marginRight: '8px' }}>Скидка:</span>
  <span style={{ fontSize: "30px", fontWeight: "bold", color: "red" }}>{order.discount}</span>
</ListGroup.Item>
<ListGroup.Item style={{ fontWeight: "bold" }}>
        <span>Новая цена: </span>
        <span style={{ fontSize: "25px", color: "red" }}>{discountAmount} </span>
        <span>руб</span> 
      </ListGroup.Item>
    </ListGroup>
    <Card.Body>
      {user.status !== "logged" ? (
        <ListGroup.Item style={{ fontSize: "20px", fontStyle: "italic" }}>
          Пожалуйста, войдите/зарегистрируйтесь
        </ListGroup.Item>
      ) : (
        <div className="text-center">
        <Card.Link href={`/orders/${order.id}`}>
          <Button
            style={{ height: "50px", width: "250px", fontSize: "16px", backgroundColor: "rgba(57, 57, 57, 1)", border: "solid #000000 1px" }}
          >
            Подробнеe
          </Button>
        </Card.Link>
      </div>
      )}
    </Card.Body>

    <YMaps
      query={{
        apikey: "https://api-maps.yandex.ru/2.1?apikey=592baee2-f061-46c0-ae1b-a87733de9d67&lang=ru_RU",
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
</Form>

  );
}

export default UiCardsOnMain;
