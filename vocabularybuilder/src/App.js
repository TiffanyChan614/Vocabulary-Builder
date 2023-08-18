import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Search from './pages/Search'
import Journal from './pages/Journal'
import Layout from './components/Layout'
import WordMeanings from './pages/WordMeanings'
import PossibleWords from './pages/PossibleWords'
import { updateSearchCurrentPage } from './reducers/searchReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()

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
              onClick={() => dispatch(updateSearchCurrentPage('search'))}
              index
              element={<PossibleWords />}
            />
            <Route
              onClick={({ params }) =>
                dispatch(updateSearchCurrentPage(`search/${params.word}`))
              }
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

export default App
