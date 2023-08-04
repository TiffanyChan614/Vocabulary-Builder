import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import reportWebVitals from './reportWebVitals'
import Home from './pages/Home'
import Search from './pages/Search'
import Journal from './pages/Journal'
import Layout from './components/Layout'
import WordMeanings from './pages/WordMeanings'
import PossibleWords from './pages/PossibleWords'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Layout />}>
          <Route
            index
            element={<Home />}
          />
          <Route
            path='search'
            element={<Search />}>
            <Route
              index
              element={<PossibleWords />}
            />
            <Route
              path=':word'
              element={<WordMeanings />}
            />
          </Route>
          <Route
            path='journal'
            element={<Journal />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
