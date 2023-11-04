import { useEffect, useState } from 'react'
import { Alert, Card, Col, Container, Row, Spinner } from 'react-bootstrap'
import {
  CloudFog2Fill,
  CloudLightningFill,
  CloudRainFill,
  CloudSnowFill,
  CloudsFill,
  CloudyFill,
  SunFill,
} from 'react-bootstrap-icons'
import { useLocation } from 'react-router-dom'

const Weather = () => {
  const [weather, setWeather] = useState({
    location: '',
    temperature: '',
    maxTemperature: '',
    minTemperature: '',
    description: '',
    condition: '',
  })

  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const location = useLocation()
  console.log('il tuo oggetto', weather)
  //   console.log(location.search)
  const url = `https://api.openweathermap.org/data/2.5/weather/${location.search}&appid=`
  const key = '2675b5f67ebe6be86ee8d73fdee7f98c&units=metric'

  useEffect(() => {
    getWeather()
  }, [])

  const getWeather = () => {
    fetch(url + key)
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else {
          throw new Error('Hai avuto un errore nel recupero del meteo')
        }
      })
      .then((data) => {
        // console.log(data)
        setTimeout(() => {
          setWeather({
            location: data.name,
            temperature: Math.trunc(data.main.temp),
            maxTemperature: Math.trunc(data.main.temp_max),
            minTemperature: Math.trunc(data.main.temp_min),
            description: data.weather[0].description,
            condition: data.weather[0].main,
          })
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
      <Container className="h-100 d-flex flex-column align-items-center justify-content-center">
        {isLoading && (
          <div className="d-flex justify-content-center align-items-center mt-3">
            <Spinner
              animation="grow"
              variant="dark"
              style={{ height: '50px', width: '50px' }}
            />
          </div>
        )}
        {isError && (
          <div className="text-center px-2">
            <Alert variant="danger">Errore nel caricamento</Alert>
          </div>
        )}
        {!isLoading && !isError && weather && (
          <Row className="justify-content-center w-100 ">
            <Col xs={6} xl={4}>
              <Card style={{ background: '#6BA7CC' }}>
                <Card.Body>
                  <Card.Title className="fs-1">{weather.location}</Card.Title>
                  <div>
                    <div className="d-flex justify-content-between mt-3 fs-5">
                      <span className="d-flex align-items-center">
                        {weather.description
                          .toLowerCase()
                          .includes('Clouds'.toLowerCase()) ? (
                          <CloudsFill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.description
                          .toLowerCase()
                          .includes('Sun'.toLowerCase()) ? (
                          <SunFill
                            color="#FFBF00"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.description
                          .toLowerCase()
                          .includes('Rain'.toLowerCase()) ? (
                          <CloudRainFill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.description
                          .toLowerCase()
                          .includes('Thunderstorm'.toLowerCase()) ? (
                          <CloudLightningFill
                            color="#37474f"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.description
                          .toLowerCase()
                          .includes('Snow'.toLowerCase()) ? (
                          <CloudSnowFill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.description
                          .toLowerCase()
                          .includes('Fog'.toLowerCase()) ? (
                          <CloudFog2Fill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.description.charAt(0).toUpperCase() +
                          weather.description.slice(1)}
                      </span>
                      <span className="d-flex align-items-center">
                        {weather.condition
                          .toLowerCase()
                          .includes('Clouds'.toLowerCase()) ? (
                          <CloudsFill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.condition
                          .toLowerCase()
                          .includes('Sun'.toLowerCase()) ? (
                          <SunFill
                            color="#FFBF00"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.condition
                          .toLowerCase()
                          .includes('Rain'.toLowerCase()) ? (
                          <CloudRainFill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.condition
                          .toLowerCase()
                          .includes('Thunderstorm'.toLowerCase()) ? (
                          <CloudLightningFill
                            color="#37474f"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.condition
                          .toLowerCase()
                          .includes('Snow'.toLowerCase()) ? (
                          <CloudSnowFill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.condition
                          .toLowerCase()
                          .includes('Fog'.toLowerCase()) ? (
                          <CloudFog2Fill
                            color="#E2FCFF"
                            className="me-1"
                            size={'20px'}
                          />
                        ) : (
                          ''
                        )}
                        {weather.condition}
                      </span>
                    </div>
                    <div className="d-flex justify-content-between mt-2 fs-5">
                      <span>{weather.temperature}°</span>
                      <span>Max: {weather.maxTemperature}°</span>
                      <span>Min: {weather.minTemperature}°</span>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}
      </Container>
    </>
  )
}
export default Weather
