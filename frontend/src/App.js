import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from './components/Layout'
import Home from './routes/Home'
import SignIn from './routes/SignIn'
import Register from './routes/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='signin' element={<SignIn/>}/>
        <Route path='register' element={<Register/>}/>
      </Route>
    </Routes>
  )
}

export default App;