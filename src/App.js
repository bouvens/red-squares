import React from 'react'
import './App.css'
import RedSquares from './components/RedSquares'

const SETTINGS = {
    heroSize: 50,
    threatSize: 30,
}

const App = () => (
    <RedSquares settings={SETTINGS} />
)

export default App
