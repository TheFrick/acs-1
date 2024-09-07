import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import Memberships from './pages/Memberships'
import Staff from './pages/Staff'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Contact from './pages/Contact'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/membership' element={<Memberships />}></Route>
          <Route path='/staff' element={<Staff />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/gallery' element={<Gallery />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
