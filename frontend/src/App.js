import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import Home from './components/home/Home'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/' Component={Home}/>
            <Route path='/login' Component={Login}/>
            <Route path='/register' Component={Register}/>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
