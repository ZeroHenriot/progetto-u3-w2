import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'

function Geolocation() {
  const [location, setLocation] = useState(null)
  const [weather, setWeather] = useState(null)
  const [lat, setLat] = useState(null)
  const [lon, setLon] = useState(null)

  useEffect(() => {
    function handleLocationClick() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success)
      } else {
        console.log('Impossibile localizzarti.')
      }
    }

    function success(position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude
      setLat(latitude)
      setLon(longitude)
      setLocation({ lat: latitude, lon: longitude })

      const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=`
      const key = '2675b5f67ebe6be86ee8d73fdee7f98c&units=metric'

      fetch(url + key)
        .then((res) => {
          if (res.ok) {
            return res.json()
          } else {
            throw new Error('Errore')
          }
        })
        .then((data) => {
          setWeather(data)
        })
        .catch((err) => {
          console.log('Si è verificato un errore', err)
        })
    }

    handleLocationClick()
  }, [])

  return (
    <Row>
      <Col
        xs={2}
        className="d-flex align-items-center ps-0"
        style={{ marginTop: '1%' }}
      >
        {weather && lat && lon ? (
          <Navigate to={`/weather?lat=${lat}&lon=${lon}`} />
        ) : null}
      </Col>
    </Row>
  )
}

export default Geolocation
