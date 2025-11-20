import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();
const initialState = { isAuth: false, user: {} };

const AuthProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [isAppLoader, setIsAppLoader] = useState(true);
    const [getAllProduct, setGetAllProduct] = useState([]);

    // Check if user is logged in from backend
    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('token');
            
            if (!token) {
                setIsAppLoader(false);
                return;
            }

            const response = await fetch('http://localhost:5000/api/users/profile', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (data.success) {
                setState({ 
                    isAuth: true, 
                    user: data.user 
                });
                // Update localStorage with fresh data
                localStorage.setItem('user', JSON.stringify(data.user));
            } else {
                // Token invalid, clear storage
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        } catch (error) {
            console.error('Auth check error:', error);
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        } finally {
            setIsAppLoader(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    // Login function (after successful login)
    const login = (userData, token) => {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        setState({ 
            isAuth: true, 
            user: userData 
        });
    };

    // Logout function
    const handleLogout = (navigate) => {
        try {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            setState(initialState);
            if (navigate) navigate('/');
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    // Get all products from backend
    const getAllProductFunction = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/products');
            const data = await response.json();
            
            if (data.success) {
                setGetAllProduct(data.products);
            } else {
                console.log("Product fetch error:", data.message);
            }
        } catch (err) {
            console.log("Product fetch error:", err);
        }
    };

    // Auto load products
    useEffect(() => {
        getAllProductFunction();
    }, []);

    return (
        <AuthContext.Provider value={{ 
            ...state, 
            setState, 
            handleLogout, 
            isAppLoader, 
            getAllProduct,
            getAllProductFunction,
            login, // Add login function
            checkAuthStatus // Add check auth function
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;