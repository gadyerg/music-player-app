import React from 'react';
import Home from './pages/Home';
import Nav from './components/UI/Nav';
import { Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
      </Routes>
    </div>
  )
}

export default App;