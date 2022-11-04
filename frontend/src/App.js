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
import SignOut from './routes/SignOut';
import Feed from './routes/Feed';
import Calendar from './routes/Calendar';
import Club from './routes/Club';
import ModifyClub from './routes/ModifyClub';
import ApproveClubs from './routes/admin/ApproveClubs';
import AdminHome from './routes/admin/AdminHome';

import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/admin/AdminRoute';

import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path='signin' element={<SignIn/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='newclub' element={<ProtectedRoute><NewClub/></ProtectedRoute>}/>
          <Route path='account/:id' element={<Account/>}/>
          <Route path='signout' element={<SignOut/>}/>
          <Route path='feed' element={<Feed/>}/>
          <Route path='calendar' element={<Calendar/>}/>
          <Route path='club/:id' element={<Club/>}/>
          <Route path='modify/:id' element={<ProtectedRoute><ModifyClub/></ProtectedRoute>}/>
          <Route path="admin">
            <Route index element={<AdminRoute><AdminHome/></AdminRoute>}/>
            <Route path="approve" element={<AdminRoute><ApproveClubs/></AdminRoute>}/>
          </Route>
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App;