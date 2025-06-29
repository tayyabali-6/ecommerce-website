import { Route, Routes } from 'react-router-dom'
import Register from './Register'
import Login from './Login'
import ForgotPassword from './forgotPassword'
import ResetPassword from './ResetPassword'

const Auth = () => {
    return (
        <div>
            <Routes>
                <Route path='register' element={<Register />} />
                <Route path='login' element={<Login />} />
                <Route path='forgot-password' element={<ForgotPassword/>} />
                <Route path='reset-password' element={<ResetPassword/>} />
            </Routes>

        </div>
    )
}

export default Auth
