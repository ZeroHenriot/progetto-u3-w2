import { Col, Container, Navbar, Row } from 'react-bootstrap'
import { CloudsFill } from 'react-bootstrap-icons'
import { Link } from 'react-router-dom'
import WeatherLocation from './WeatherLocation'
import { useState } from 'react'

const MyNavBar = () => {
  const resetWeatherLocationInput = (setSearchValue) => {
    setSearchValue('') // Imposta il valore dello stato searchValue a una stringa vuota
  }
  return (
    <Navbar className="bg-dark">
      <Container
        fluid
        className="justify-content-center justify-content-sm-start"
      >
        <Link
          to="/"
          className="nav-link text-light fs-3 fw-bold me-3"
          onClick={resetWeatherLocationInput}
        >
          <div className="d-flex align-items-center text-nowrap">
            <CloudsFill color="white" className="me-2" />
            Weather<span className="d-none d-sm-inline">App</span>
          </div>
        </Link>
        <Row className="w-100">
          <Col xs={10}>
            <WeatherLocation />
          </Col>
        </Row>
      </Container>
    </Navbar>
  )
}

export default MyNavBar
