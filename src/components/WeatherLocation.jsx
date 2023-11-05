import { useEffect, useState } from "react";
import { Col, Container, Form, ListGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const WeatherLocation = () => {
  const [city, setCity] = useState([]);
  // console.log('queste sono le città', city)
  const [searchValue, setSearchValue] = useState("");
  const url = `http://api.openweathermap.org/geo/1.0/direct?q=${searchValue}&limit=${5}&appid=`;
  const key = "2675b5f67ebe6be86ee8d73fdee7f98c";

  useEffect(() => {
    if (searchValue !== "") {
      getLocation();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchValue]);

  const getLocation = () => {
    if (searchValue !== "") {
      console.log(searchValue);
      fetch(url + key)
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error("Hai un errore nel recupero");
          }
        })
        .then((data) => {
          // console.log("blablabla", data);
          setCity(data);
        })
        .catch((err) => {
          console.log("Hai un nuovo errore ", err);
        });
    }
  };

  return (
    <>
      <div className="h-100">
        <Row className="justify-content-end h-100">
          <Col xs={10}>
            <ListGroup className="position-relative">
              <div>
                <Form.Control
                  placeholder="Cerca città"
                  className="style-none fs-5"
                  value={searchValue}
                  onChange={(e) =>
                    setSearchValue(
                      e.target.value.charAt(0).toUpperCase() +
                        e.target.value.slice(1).toLowerCase()
                    )
                  }
                />
                <div className="results position-absolute w-100">
                  {city
                    .filter((city) =>
                      city.name.toLowerCase(searchValue.toLowerCase())
                    )
                    .map((city, index) => (
                      <Row key={index}>
                        <Col>
                          <ListGroup.Item
                            className={` ${
                              !searchValue ? "d-none" : "d-block"
                            } mt-1 rounded fs-5 border-0`}
                            style={{ background: "#b3def4" }}
                          >
                            <Link
                              to={`/weather/?lat=${city.lat}&lon=${city.lon}`}
                              className="d-flex
                       justify-content-between link text-black"
                              style={{ textDecoration: "none" }}
                              onClick={() => setSearchValue("")}
                            >
                              <Row className="w-100 justify-content-between">
                                <Col xs={12} md={4}>
                                  <span>{searchValue ? city.name : ""}</span>
                                </Col>
                                <Col md={6} className="d-none d-md-block">
                                  <span>{searchValue ? city.state : ""}</span>
                                </Col>
                                <Col
                                  sm={2}
                                  className="text-end d-none d-sm-block"
                                >
                                  <span>{searchValue ? city.country : ""}</span>
                                </Col>
                              </Row>
                            </Link>
                          </ListGroup.Item>
                        </Col>
                      </Row>
                    ))}
                </div>
              </div>
            </ListGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default WeatherLocation;
