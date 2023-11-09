import { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import {
  CloudFog2Fill,
  CloudHaze2Fill,
  CloudLightningRainFill,
  CloudRainFill,
  CloudSnowFill,
  CloudsFill,
  SunFill,
} from 'react-bootstrap-icons'
import { useLocation } from 'react-router-dom'
import AdditionalInfos from './AdditionalInfos'
import WeatherForecast from './WeatherForecast'

const Weather = () => {
  const [weather, setWeather] = useState({
    location: '',
    description: '',
    temperature: '',
    maxTemperature: '',
    minTemperature: '',
    date: '',
  })

  const dayNames = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ]

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const location = useLocation()
  // console.log("il tuo oggetto", weather);
  //   console.log(location.search)
  const url = `https://api.openweathermap.org/data/2.5/weather${location.search}&appid=`
  const key = '2675b5f67ebe6be86ee8d73fdee7f98c&units=metric'

  useEffect(() => {
    getWeather()
  }, [location.search])

  const getWeather = () => {
    setIsLoading(true)
    fetch(url + key)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Hai avuto un errore nel recupero del meteo')
        }
      })
      .then((data) => {
        // console.log(data);
        setTimeout(() => {
          setWeather(() => ({
            location: data.name,
            description: data.weather[0].description,
            temperature: Math.trunc(data.main.temp),
            maxTemperature: Math.trunc(data.main.temp_max),
            minTemperature: Math.trunc(data.main.temp_min),
            date: dayNames[new Date(data.dt * 1000).getDay()],
          }))

          setIsLoading(false)
        }, 650)
      })
      .catch((err) => {
        setIsLoading(false)
        setIsError(true)
        console.log('hai avuto un errore', err)
      })
  }
  return (
    <>
      <Container fluid className="h-100 d-flex flex-column align-items-center">
        {isLoading && (
          <div className="d-flex h-100 align-items-center justify-content-center mt-3">
            <Spinner
              animation="grow"
              variant="dark"
              style={{ height: '50px', width: '50px' }}
            />
          </div>
        )}
        {isError && (
          <div className="d-flex px-2 h-100 align-items-center justify-content-center">
            <Alert variant="danger">Errore nel caricamento</Alert>
          </div>
        )}
        {!isLoading && !isError && weather && (
          <>
            <Row className="justify-content-center w-100 ">
              <Col>
                <Card
                  style={{
                    background: 'transparent',
                  }}
                  className="text-light main-card"
                >
                  <Card.Body className="d-flex justify-content-between align-items-center">
                    <Row className=" w-100">
                      <Col className="today-weather">
                        <Card.Title className="display-3">
                          {weather.location}
                        </Card.Title>
                        <div>
                          <div className="date mb-2 fs-4 ">
                            <span>Today</span>
                            <span className="fw-bold ms-2">{weather.date}</span>
                          </div>
                          <div className="d-flex justify-content-between fs-5">
                            <span className="d-flex align-items-center w-100 today-condition">
                              <span className="fs-4">
                                {weather.description.charAt(0).toUpperCase() +
                                  weather.description.slice(1)}
                              </span>
                              {weather.description
                                .toLowerCase()
                                .includes('Cloud'.toLowerCase()) ? (
                                <CloudsFill
                                  color="#E2FCFF"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                              {weather.description
                                .toLowerCase()
                                .includes('Clear'.toLowerCase()) ? (
                                <SunFill
                                  color="#FFBF00"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                              {weather.description
                                .toLowerCase()
                                .includes('Rain'.toLowerCase()) ? (
                                <CloudRainFill
                                  color="#E2FCFF"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                              {weather.description
                                .toLowerCase()
                                .includes('Thunderstorm'.toLowerCase()) ? (
                                <CloudLightningRainFill
                                  color="#37474f"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                              {weather.description
                                .toLowerCase()
                                .includes('Snow'.toLowerCase()) ? (
                                <CloudSnowFill
                                  color="#E2FCFF"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                              {weather.description
                                .toLowerCase()
                                .includes('Fog'.toLowerCase()) ? (
                                <CloudFog2Fill
                                  color="#E2FCFF"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                              {weather.description
                                .toLowerCase()
                                .includes('Haze'.toLowerCase()) ? (
                                <CloudHaze2Fill
                                  color="#E2FCFF"
                                  className="ms-2"
                                  size={'30px'}
                                />
                              ) : (
                                ''
                              )}
                            </span>
                          </div>
                          <div className="temperature d-flex mt-2 fs-4 today-condition">
                            <span className="text-nowrap">
                              Max: {weather.maxTemperature}°
                            </span>

                            <span className="ms-2 text-nowrap">
                              Min: {weather.minTemperature}°
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col className="current-temp fw-light">
                        <span>{weather.temperature}°</span>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <Row className="justify-content-center w-100 my-3">
              <WeatherForecast />
              <AdditionalInfos />
            </Row>
          </>
        )}
      </Container>
    </>
  )
}
export default Weather
