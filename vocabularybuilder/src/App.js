import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search/Search'
import Journal from './pages/Journal'
import Layout from './components/UI/Layout'
import WordMeanings from './pages/Search/WordMeanings'
import PossibleWords from './pages/Search/PossibleWords'
import Review from './pages/Review/Review'
import Flashcards from './pages/Review/Flashcards'
import FlashcardsMode from './pages/Review/FlashcardsMode'
import Card from './pages/Review/Card'
import FlashcardsResult from './pages/Review/FlashcardsResult'

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
