import { useEffect, useState } from "react";
import { Alert, Card, Col, Container, Row, Spinner } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const AdditionalInfos = () => {
  const [weather, setWeather] = useState({
    sunrise: "",
    sunset: "",
    wind: "",
    humidity: "",
  });

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  console.log("il tuo oggetto", weather);
  const url = `https://api.openweathermap.org/data/2.5/weather${location.search}&appid=`;
  const key = "2675b5f67ebe6be86ee8d73fdee7f98c&units=metric";

  useEffect(() => {
    getWeather();
  }, []);

  const getWeather = () => {
    fetch(url + key)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Hai avuto un errore nel recupero del meteo");
        }
      })
      .then((data) => {
        console.log("i tuoi dati bla bla bla", data);
        setTimeout(() => {
          setWeather(() => ({
            sunrise: ` ${new Date(data.sys.sunrise * 1000).getHours()}:00`,
            sunset: ` ${new Date(data.sys.sunset * 1000).getHours()}:00`,
            wind: ` ${data.wind.speed} kmh`,
            humidity: ` ${data.main.humidity} %`,
          }));

          setIsLoading(false);
        }, 650);
      })
      .catch((err) => {
        console.log("hai avuto un errore", err);
        setIsLoading(false);
      });
  };
  return (
    <>
      {!isLoading && weather && (
        <Col xs={5} className="h-100 d-flex flex-column align-items-center">
          <Row className="justify-content-center w-100 mt-3 flex-column">
            <Col>
              <Card
                style={{ background: "transparent" }}
                className="mb-3 prev-card"
              >
                <Card.Body className="d-flex align-items-center justify-content-between text-light ">
                  <Row className="w-100 justify-content-between align-items-center">
                    <Col xs={5}>
                      <Card.Title className="mb-0">
                        <span className="fs-4">Sunrise:</span>
                      </Card.Title>
                    </Col>
                    <Col xs={5} className="fs-5">
                      {weather.sunrise}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{ background: "transparent" }}
                className="mb-3 prev-card"
              >
                <Card.Body className="d-flex align-items-center justify-content-between text-light ">
                  <Row className="w-100 justify-content-between align-items-center">
                    <Col xs={5}>
                      <Card.Title className="mb-0">
                        <span className="fs-4">Sunset:</span>
                      </Card.Title>
                    </Col>
                    <Col xs={5} className="fs-5">
                      {weather.sunset}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{ background: "transparent" }}
                className="mb-3 prev-card"
              >
                <Card.Body className="d-flex align-items-center justify-content-between text-light ">
                  <Row className="w-100 justify-content-between align-items-center">
                    <Col xs={5}>
                      <Card.Title className="mb-0">
                        <span className="fs-4">Humidity:</span>
                      </Card.Title>
                    </Col>
                    <Col xs={5} className="fs-5">
                      {weather.humidity}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col>
              <Card
                style={{ background: "transparent" }}
                className="mb-3 prev-card"
              >
                <Card.Body className="d-flex align-items-center justify-content-between text-light ">
                  <Row className="w-100 justify-content-between align-items-center">
                    <Col xs={5}>
                      <Card.Title className="mb-0">
                        <span className="fs-4">Wind:</span>
                      </Card.Title>
                    </Col>
                    <Col xs={5} className="fs-5">
                      {weather.wind}
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      )}
    </>
  );
};
export default AdditionalInfos;
