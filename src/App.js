import React from 'react'
import './App.css'
import RedSquares from './components/RedSquares'

const SETTINGS = {
    heroSize: 50,
    threatSize: 30,
    threatLimit: 10,
    threatAddTimeout: 1500,
    threatRemoveProbability: 20,
}

const App = () => (
    <RedSquares {...SETTINGS} />
)

export default App
