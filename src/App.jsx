import React, { useEffect } from 'react';
import Route from './pages/Routes';
import './App.scss';
import { useAuthContext } from './context/Auth';
import Loader from './Loader/isLoader';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// ✅ Import AOS
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const { isAppLoader } = useAuthContext();

  // ✅ Initialize AOS
  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true,     // animation happen only once while scrolling
      easing: 'ease-in-out',
    });
  }, []);

  return (
    <>
      {isAppLoader ? <Loader /> : <Route />}
    </>
  );
}

export default App;
