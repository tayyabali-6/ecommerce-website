import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Frontend from './Frontend'
import Dashboard from './Dashboard'
import Auth from './Auth'
import { useAuthContext } from '../context/Auth'

const Index = () => {
    const { isAuth } = useAuthContext()
    return (
        <>
            <Routes>
                <Route path='/*' element={<Frontend />} />
                <Route path='/auth/*' element={isAuth ? <Navigate to='/' /> : <Auth />} />
                <Route path='/dashboard/*' element={<Dashboard />} />
            </Routes>
        </>
    )
}

export default Index
