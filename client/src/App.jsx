import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import MainLayout from './Layout/MainLayout'
import Contact from './Pages/Contact'
import About from './Pages/About'
import BrowseCars from './Pages/BrowseCars'
import CarDetails from './Pages/carDetails'
import { Toaster } from 'react-hot-toast'
import Profile from './Pages/Profile'
import AdminLogin from './Pages/Admin/AdminLogin'
import RequireAdmin from './Components/RequireAdmin'
import AdminDashboard from './Pages/Admin/AdminDashboard'
import AddCar from './Pages/Admin/AddCar'
import AdminLayout from './Layout/AdminLayout'
import ViewCar from './Pages/Admin/ViewCar'
import EditCar from './Pages/Admin/EditCar'
import MyBookings from './Pages/MyBookings'
import AdminBookingsPage from './Pages/Admin/ViewBookings'
import Loader from './Components/Loader'

function App() {
  const [count, setCount] = useState(0)

  return (
   <div>
    <Toaster/>
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="/Contact" element={<Contact/>}/>                                   
        <Route path="/cars" element={<BrowseCars />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/loader" element={<Loader/>}/>
        {/* <Route path="booking" element={<Booking />} /> */}
        <Route path="/about" element={<About />} />
      </Route>

      <Route path="/admin" element={<RequireAdmin />}>
          <Route element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="add-cars" element={<AddCar/>} />
            <Route path="view-cars" element={<ViewCar/>} />
            <Route path="view-bookings" element={<AdminBookingsPage/>}/>
            <Route path="editcar/:id" element={<EditCar />} />
          </Route>
        </Route>


      {/* <Route path="/" element={<Home/>} /> */}
        <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

    </Routes>
   </div>
  )
}

export default App


