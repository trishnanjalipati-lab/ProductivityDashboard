import React from 'react'
import Header from './components/Header.jsx'
import { Outlet } from 'react-router-dom'
import Login from './components/Login.jsx';

function Root() {
  return (
    <>
    <Header />
    <Outlet />
    </>
  );
}

export default Root