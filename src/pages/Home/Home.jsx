import React from 'react'
import Header from '../../components/Header/Header'
import { Routes, Route } from "react-router-dom";

const Home = () => {
  return (
    <Routes>
      <Route path="/" element={<Header/>}/>
      
    </Routes>
  )
}

export default Home