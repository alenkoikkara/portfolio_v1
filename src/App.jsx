import React from 'react';
import FluidCanvas from './components/FluidCanvas';
import Navbar from './components/Navbar';
import BottomBar from './components/BottomBar';

function App() {

  return (
    <div className="relative w-full h-screen flex justify-between items-center">
      <Navbar />
      <FluidCanvas />
      <BottomBar />
    </div>
  )
}

export default App;
