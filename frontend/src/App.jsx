
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Signup } from './pages/Auth/Signup'
import { Login } from './pages/Auth/Login'

function App(){
  return <div>
      <Router>
        <Routes>
              <Route path="/dashboard" element={<Home />}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
  </div>
}

export default App
