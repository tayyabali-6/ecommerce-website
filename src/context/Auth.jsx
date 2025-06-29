import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, firestore } from '../config/firebase';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';

const AuthContext = createContext();
const initialState = { isAuth: false, user: {} };

const AuthProvider = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [isAppLoader, setIsAppLoader] = useState(true);
    const [getAllProduct, setGetAllProduct] = useState([]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const ref = doc(firestore, 'users', user.uid);
                const snap = await getDoc(ref);
                if (snap.exists()) {
                    setState({ isAuth: true, user: snap.data() });
                }
            } else {
                setState(initialState);
            }
            setIsAppLoader(false);
        });

        return () => unsubscribe();
    }, []);

    const handleLogout = (navigate) => {
        signOut(auth)
            .then(() => {
                setState(initialState);
                navigate('/');
            })
            .catch((err) => console.error('Logout error:', err));
    };

    const getAllProductFunction = async () => {
        try {
            const q = query(collection(firestore, "products"), orderBy('time'));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const productArray = [];
                snapshot.forEach((doc) => productArray.push({ ...doc.data(), id: doc.id }));
                setGetAllProduct(productArray);
            });
            return () => unsubscribe();
        } catch (err) {
            console.log("Product fetch error:", err);
        }
    };

    useEffect(() => {
        getAllProductFunction();
    }, []);

    return (
        <AuthContext.Provider value={{ ...state, setState, handleLogout, isAppLoader, getAllProduct }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthProvider;
