import React from 'react'
import './App.css'
import RedSquares from './components/RedSquares'

const SETTINGS = {
    heroSize: 50,
    threatSize: 30,
    threatLimit: 5,
    threatAddTimeout: 2,
}

const App = () => (
    <RedSquares {...SETTINGS} />
)

export default App
