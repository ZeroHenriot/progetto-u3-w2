import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import WeatherLocation from './components/WeatherLocation'
import 'bootstrap/dist/css/bootstrap.min.css'
import NotFound from './components/NotFound'
import Weather from './components/Weather'
import MyNavBar from './components/MyNavBar'
import MyFooter from './components/MyFooter'
import HomePage from './components/HomePage'

function App() {
  const hour = new Date ().getHours()
  console.log(hour)
  return (
    <>
      <BrowserRouter>
        <div className="d-flex flex-column h-100">
          <header>
            <MyNavBar />
          </header>
          <main className={`flex-grow-1 ${hour>6 && hour<18?'main-bg-day':'main-bg-night'}`}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/" element={<WeatherLocation />} /> */}
              <Route path="/weather" element={<Weather />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <footer>
            <MyFooter />
          </footer>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
