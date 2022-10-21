import React from 'react';
import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from './components/Layout'
import Home from './routes/Home'
import SignIn from './routes/SignIn'
import Register from './routes/Register'
import NewClub from './routes/NewClub'
import Account from './routes/Account'

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='newclub' element={<NewClub/>}/>
          <Route path='account' element={<Account/>}/>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App;