import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Home'
import Header from '../../components/Header'
import Footer from '../../components/Footer/footer'
import ProductInfo from './ProductInfo/ProductInfo'
import Cart from './Cart/cartPage'
import Checkout from './Checkout'
import ThankYou from './ThanksPage'
import AllProducts from './AllProducts'
import FashionProducts from './FeshionProducts'
import LaptopProducts from './LaptopProducts'
import CameraProducts from './CameraProducts'
import MobileProducts from './MobileProducts'
import BooksProducts from './BooksProducts'
import TechProducts from './TechProducts'
import PageNotFound from './PageNotFound'
import Payment from '../../components/Payment/Payment'

const Frontend = () => {
    return (
        <>
            <Header />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/allproducts' element={<AllProducts />} />
                <Route path='/productInfo' element={<ProductInfo />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<Checkout />} />
                <Route path="/thank-you" element={<ThankYou />} />
                <Route path='/fashionProducts' element={<FashionProducts />} />
                <Route path='/laptopProducts' element={<LaptopProducts />} />
                <Route path='/cameraProducts' element={<CameraProducts />} />
                <Route path='/booksProducts' element={<BooksProducts />} />
                <Route path='/techProducts' element={<TechProducts />} />
                <Route path='/mobileProducts' element={<MobileProducts/>} />
                  <Route path="*" element={<PageNotFound />} />
                  <Route path="/payment" element={<Payment />} />

            </Routes>
            <Footer />
        </>
    )
}

export default Frontend
