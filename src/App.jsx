import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from "./pages/HomePage"
import Memberships from './pages/Memberships'
import Staff from './pages/Staff'


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/membership' element={<Memberships />}></Route>
          <Route path='/staff' element={<Staff />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
