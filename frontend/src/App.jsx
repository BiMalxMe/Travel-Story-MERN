
import {Route, BrowserRouter as Router, Routes, Navigate} from 'react-router-dom'
import { Home } from './pages/Home/Home'
import { Signup } from './pages/Auth/Signup'
import { Login } from './pages/Auth/Login'

function App(){
  return <div>
      <Router>
        <Routes>
              <Route path="/" element={<Root />}/>
              <Route path="/dashboard" element={<Home />}/>
              <Route path="/login" element={<Login/>}/>
              <Route path="/signup" element={<Signup/>}/>
        </Routes>
      </Router>
  </div>
}

//Define the root component to handle the initial redirect
const Root=()=>{
  //Check if token exisits in localstorage
  const isAuthenticated=!!localStorage.getItem('token')

  //Redirect to dashboard if authenticated, otherwise to login
  return isAuthenticated?(
    <Navigate to="/dashboard" />
  ):(
    <Navigate to="/login" />
  );
}

export default App
