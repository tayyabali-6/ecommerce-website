import React from 'react'
import { Route, Routes } from 'react-router-dom'
import UserDashboard from './UserDashboard'

const User = () => {
    return (
        <>
            <Routes>
                <Route path='userDashboard' element={<UserDashboard />} />
            </Routes>
        </>
    )
}

export default User
