import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import MainPage from './components/MainPage'
import LoginForm from './components/LoginForm'

const App = () => (
  <Router>
    <Routes>
      <Route path='/login' element={<LoginForm />} />
      <Route path='/users/:id' element={<User />} />
      <Route path='/users' element={<Users />} />
      <Route path='/blogs/:id' element={<Blog />} />
      <Route path='/' element={<MainPage />} />
    </Routes>
  </Router>
)

export default App
