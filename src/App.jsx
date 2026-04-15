import { useState } from 'react'

function App() {

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8 gap-12">
      <div className="text-center">
        <h1 className="text-6xl font-black mb-4">Satoshi</h1>
        <p className="text-xl text-neutral-600 max-w-md">
          Universal, clean, and premium sans-serif.
        </p>
      </div>

      <div className="text-center">
        <h1 className="text-6xl font-pixel mb-4">Pixelify Sans</h1>
        <p className="text-xl text-neutral-600 max-w-md font-pixel">
          Fun, retro-style pixel font.
        </p>
      </div>
    </div>
  )
}

export default App
