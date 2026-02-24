import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import CardPreview from './CardPreview'
import CardBuilder from './CardBuilder'

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <CardBuilder />
      </div>
    </>
  )
}

export default App
