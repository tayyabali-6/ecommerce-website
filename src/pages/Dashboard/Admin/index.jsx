import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminDashboard from './AdminDashboard'
import AddProducts from './AddProducts'
import UpdateProducts from './UpdateProducts'

const Admin = () => {
    return (
        <div>
            <Routes>
                <Route path='adminDashboard' element={<AdminDashboard />} />
                <Route path='addProducts' element={<AddProducts />} />
                <Route path='updateProducts/:id' element={<UpdateProducts />} />
            </Routes>
        </div>
    )
}

export default Admin
