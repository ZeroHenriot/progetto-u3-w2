import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import {
  CloudFog2Fill,
  CloudHaze2Fill,
  CloudLightningRainFill,
  CloudRainFill,
  CloudSnowFill,
  CloudsFill,
  SunFill,
  ThermometerHigh,
  ThermometerLow,
} from "react-bootstrap-icons";
import { useLocation } from "react-router-dom";

const WeatherForecast = () => {
  const [weather, setWeather] = useState({});
  const renderiez = [6, 14, 19, 28, 35];
  const [forecastDays, setForecastDays] = useState([]);
  //   console.log(forecastDays);

  const [isLoading, setIsLoading] = useState(true);

  const location = useLocation();
  //   console.log("il tuo oggetto", weather);
  //   console.log(location.search)
  const url = `https://api.openweathermap.org/data/2.5/forecast/${location.search}&appid=`;
  const key = "2675b5f67ebe6be86ee8d73fdee7f98c&units=metric";

  const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  useEffect(() => {
    getWeather();
  }, [location.search]);

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
        setTimeout(() => {
          const updatedWeatherData = data.list.map((item) => ({
            date: dayNames[new Date(item.dt * 1000).getDay()],
            temperature: Math.trunc(item.main.temp),
            maxTemperature: Math.trunc(item.main.temp_max),
            minTemperature: Math.trunc(item.main.temp_min),
            description: item.weather[0].description,
            condition: item.weather[0].main,
          }));

          setWeather((prevWeather) => ({
            ...prevWeather,
            weatherData: updatedWeatherData,
          }));

          const filteredDataForecast2 = renderiez.map(
            (index) => data.list[index]
          );

          setForecastDays(filteredDataForecast2);

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
        <Col md={7} className="prev-weather">
          <Row className="justify-content-center w-100 mt-3 flex-column">
            {forecastDays.map((day, index) => {
              return (
                <Col key={index}>
                  <Card
                    style={{ background: "transparent" }}
                    className="mb-3 prev-card"
                  >
                    <Card.Body className="d-flex align-items-center justify-content-between text-light ">
                      <Row className="w-100 justify-content-between align-items-center">
                        <Col xs={5}>
                          <Card.Title className="mb-0 text-nowrap">
                            <span className="fs-4">
                              {dayNames[new Date(day.dt * 1000).getDay()]}
                            </span>
                          </Card.Title>
                        </Col>
                        <Col xs={2}>
                          <div>
                            <div className="d-flex justify-content-between fs-5">
                              <span className="d-flex align-items-center">
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Cloud".toLowerCase()) ? (
                                  <CloudsFill
                                    color="#E2FCFF"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Clear".toLowerCase()) ? (
                                  <SunFill
                                    color="#FFBF00"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Rain".toLowerCase()) ? (
                                  <CloudRainFill
                                    color="#E2FCFF"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Thunderstorm".toLowerCase()) ? (
                                  <CloudLightningRainFill
                                    color="#37474f"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Snow".toLowerCase()) ? (
                                  <CloudSnowFill
                                    color="#E2FCFF"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Fog".toLowerCase()) ? (
                                  <CloudFog2Fill
                                    color="#E2FCFF"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                                {day.weather[0].description
                                  .toLowerCase()
                                  .includes("Haze".toLowerCase()) ? (
                                  <CloudHaze2Fill
                                    color="#E2FCFF"
                                    className="me-1"
                                    size={"30px"}
                                  />
                                ) : (
                                  ""
                                )}
                              </span>
                            </div>
                          </div>
                        </Col>
                        <Col xs={3}>
                          <div className="d-flex fs-4 justify-content-start offset-2 text-nowrap">
                            <span>Temp: {Math.trunc(day.main.temp_max)}°</span>
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      )}
    </>
  );
};
export default WeatherForecast;
