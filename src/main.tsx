import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { enableSmoothScroll } from './smooth'
import { enableReveal } from './reveal'
import { enableCountUp } from './countup'

enableSmoothScroll()
enableReveal()
enableCountUp()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
