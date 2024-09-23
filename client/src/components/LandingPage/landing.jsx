import React from 'react'
import Navbar from './Navbar'
import Carousel from './Carousel'
import ThreeCards from './Statistics'
import CardCarousel from './Howitworks'
import Footer from './Footer'
import Pros from './Pros'


export default function Landing() {
  return (
    <>
    <Navbar/>
    <Carousel/>
    
    <ThreeCards/>
    <CardCarousel/>
    <Pros/>
    <Footer/>
    
    </>
  )
}
