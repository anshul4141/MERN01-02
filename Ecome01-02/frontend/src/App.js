import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './components/pages/HomePage'
import About from './components/pages/About'
import Contact from './components/pages/Contact'
import Policy from './components/pages/Policy'
import Pagenotfound from './components/pages/Pagenotfound'
import Register from './components/pages/Auth/Register'
import Login from './components/pages/Auth/Login'
import Dashboard from './components/pages/user/Dashboard'
import PrivateRoute from './components/Routes/Private'
import ForgotPasssword from './components/pages/Auth/ForgotPassword'
import AdminDashboard from './components/pages/Admin/AdminDashboard'
import AdminRoute from './components/Routes/AdminRoute'
import CreateCategory from './components/pages/Admin/CreateCategory'
import CreateProduct from './components/pages/Admin/CreateProduct'
import Users from './components/pages/Admin/Users'
import Product from './components/pages/Admin/Product'
import Profile from './components/pages/user/Profile'
import Orders from './components/pages/user/Orders'
import UpdateProduct from './components/pages/Admin/UpdateProduct'

const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />

        <Route path='/dashboard' element={<PrivateRoute />}>
          <Route path='user' element={<Dashboard />} />
          <Route path='user/profile' element={<Profile />} />
          <Route path='user/orders' element={<Orders />} />
        </Route>

        <Route path='/dashboard' element={<AdminRoute />}>
          <Route path="admin" element={<AdminDashboard />} />
          <Route path="admin/create-category" element={<CreateCategory />} />
          <Route path="admin/create-product" element={<CreateProduct />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/products" element={<Product />} />
          <Route path="admin/users" element={<Users />} />
        </Route>

        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPasssword />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/policy' element={<Policy />} />
        <Route path='*' element={<Pagenotfound />} />
      </Routes>
    </>
  )
}

export default App