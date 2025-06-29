import React from 'react'
import { Route, Routes } from 'react-router-dom'
import User from './User'
import Header from '../../components/Header'
import Footer from '../../components/Footer/footer'
import Admin from './Admin'
import { ProtectedRouteForAdmin } from '../../protectedRoute/ProtectedRouteForAdmin'
import { ProtectedRouteForUser } from '../../protectedRoute/ProtectedRouteForUser'

const Dashboard = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route path='admin/*' element={
                    <ProtectedRouteForAdmin>
                        <Admin />
                    </ProtectedRouteForAdmin>

                } />
                <Route path='user/*' element={
                    <ProtectedRouteForUser>
                        <User />
                    </ProtectedRouteForUser>

                } />
            </Routes>
            <Footer />
        </div>
    )
}

export default Dashboard
