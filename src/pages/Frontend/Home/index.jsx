import React from 'react'
import Hero from './Hero'
import Category from './Category'
import HomePageProducts from './HomePageProducts'
import Track from './Track'
import FeaturedSection from './FeaturedSection'

const Home = () => {
    return (
        <main>
            <Hero />
            <HomePageProducts />
            <Category />
            <Track />
            <FeaturedSection />
        </main>
    )
}

export default Home   