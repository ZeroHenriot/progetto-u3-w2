import { Container } from 'react-bootstrap'

function MyFooter() {
  return (
    <>
      <Container className="bg-dark" fluid>
        <div className="d-flex justify-content-center py-4 border-top text-light">
          &copy; {new Date().getFullYear()} Weather App by Catalin Darii
        </div>
      </Container>
    </>
  )
}

export default MyFooter
