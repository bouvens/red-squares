import React from 'react'
import './App.css'
import { DEFAULTS } from './constants'
import RedSquares from './components/RedSquares'

const App = () => (
    <RedSquares defaults={DEFAULTS} />
)

export default App
