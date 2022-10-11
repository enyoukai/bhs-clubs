import React, { useState, useEffect } from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from './routes/Layout'
import Home from './routes/Home'
import SignIn from './routes/SignIn'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path='signin' element={<SignIn/>}/>
      </Route>
    </Routes>
  )
}

export default App;