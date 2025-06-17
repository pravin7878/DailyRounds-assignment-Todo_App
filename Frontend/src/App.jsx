import './App.css'
import React from 'react';
import Layout from './components/layout/Layout'
import Dashboard from './pagas/Dashboard'
import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import Login from './pagas/Login';
import Register from './pagas/Register';
import PrivateRoute from './components/custom/PrivateRoute';
import AddNewTask from './pagas/AddNewTask';
import { Toaster } from "./components/ui/toaster"

function App() {

  return (
    <>
      <Container>
          <Layout>
            <Toaster/>
            <Routes>
              <Route path='/' element={<PrivateRoute>
                <Dashboard/>
              </PrivateRoute>}/>
              <Route path='/task/add' element={<PrivateRoute>
                <AddNewTask/>
              </PrivateRoute>}/>
              <Route path='/singin' element={<Login/>}/>
              <Route path='/singup' element={<Register/>}/>
            </Routes>
          </Layout>
      </Container>
    </>
  )
}

export default App
