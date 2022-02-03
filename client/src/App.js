import React from 'react';
import Home from './pages/Home';
import Nav from './components/UI/Nav';
import AddSong from './pages/AddSong';
import { Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-song' element={<AddSong />} />
      </Routes>
    </div>
  )
}

export default App;