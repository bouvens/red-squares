import React from 'react'
import './App.css'
import { DEFAULTS } from './constants/game'
import RedSquares from './components/RedSquares'

const App = () => (
    <RedSquares defaults={DEFAULTS} />
)

export default App
