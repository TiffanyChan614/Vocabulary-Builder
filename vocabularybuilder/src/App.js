import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Journal from './pages/Journal'
import Layout from './components/Layout'
import WordMeanings from './pages/WordMeanings'
import PossibleWords from './pages/PossibleWords'
import Review from './pages/Review'
import Flashcards from './pages/Flashcards'
import FlashcardsMode from './pages/FlashcardsMode'
import Card from './pages/Card'
import FlashcardsResult from './pages/FlashcardsResult'

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
          <Route
            path='review'
            element={<Review />}>
            <Route
              path='flashcards'
              element={<Flashcards />}>
              <Route
                index
                element={<FlashcardsMode />}
              />
              <Route
                path=':index'
                element={<Card />}
              />
              <Route
                path='result'
                element={<FlashcardsResult />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
