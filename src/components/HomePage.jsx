import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import WeatherLocation from "./WeatherLocation";
import { Col, Container, Row, Button } from "react-bootstrap";
import { GeoFill } from "react-bootstrap-icons";

function HomePage() {
  const [location, setLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [lat, setLat] = useState(null);
  const [lon, setLon] = useState(null);

  function handleLocationClick() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(success);
    } else {
      console.log("Impossibile localizzarti.");
    }
  }

  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setLat(latitude);
    setLon(longitude);
    setLocation({ lat: latitude, lon: longitude });

    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=`;
    // const url =
    const key = "2675b5f67ebe6be86ee8d73fdee7f98c&units=metric";

    fetch(url + key)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Errore");
        }
      })
      .then((data) => {
        setWeather(data);
        console.log(data);
      })
      .catch((err) => {
        console.log("Si è verificato un errore", err);
      });
  }

  return (
    <Container fluid className="justify-content-center mt-3">
      <Row>
        <Col xs={10}>
          <WeatherLocation />
        </Col>
        <Col xs={2}>
          {!location ? (
            <Button
              onClick={handleLocationClick}
              className="bg-white border-0 position-absolute"
            >
              <GeoFill className="fs-4 text-dark" />
            </Button>
          ) : null}
          {weather && lat && lon ? (
            <Navigate to={`/weather?lat=${lat}&lon=${lon}`} />
          ) : null}
        </Col>
      </Row>
    </Container>
  );
}

export default HomePage;
