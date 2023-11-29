import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserHome from "./components/user/UserHome";
import AdminHome from "./components/admin/adminHome/AdminHome";
import UserCreate from "./components/admin/adminHome/userOperations/UserCreate";
import UserEdit from "./components/admin/adminHome/userOperations/UserEdit";
import UserDetails from "./components/admin/adminHome/userOperations/UserDetails";

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route exact path='/' Component={Login}/>
            <Route path='/userHome' Component={UserHome}/>
            <Route path='/adminHome' Component={AdminHome}/>
            <Route path='/login' Component={Login}/>
            <Route path='/register' Component={Register}/>
            <Route path='/admin/user/create' Component={UserCreate}></Route>
            <Route path='/admin/userDetails/:userId' Component={UserDetails}></Route>
            <Route path='/admin/editUser/:userId' Component={UserEdit}></Route>
          </Routes>
        </Router>
      </div>
  );
}

export default App;
