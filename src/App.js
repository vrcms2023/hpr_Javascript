
import './App.css';
import Footer from './Common/Footer/Footer';
import Header from './Common/Header/Header';
import Home from './Frontend/Pages/Home';
import About from './Frontend/Pages/About'
import Projects from './Frontend/Pages/Projects';
import Gallery from './Frontend/Pages/Gallery';
import Contact from './Frontend/Pages/Contact';
import Login from './Admin/Pages/Login/Login';
import Dashboard from './Admin/Pages/Login/Dashboard';
import AddProject from './Admin/Pages/Login/AddProject';
import ProtectedRoute from './Frontend/Components/ProtectedRoute';
import UserAdmin from './Admin/Pages/Login/UserAdmin';

import AdminHeader from './Admin/Components/Header/AdminHeader'

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ApplicationPages from './Admin/Pages/Login/ApplicationPages';

function App() {
  return (
        <>
          <BrowserRouter>
          {window.location.pathname === "/login" || window.location.pathname === "/dashboard"  || window.location.pathname === "/addproject" ? <AdminHeader /> : <Header /> }
          {/* <Header /> */}
            <Routes>
              <Route exact path='/' element={ <Home/> } />
              <Route exact path='/about' element={ <About /> } />
              <Route exact  path='/projects' element={ <Projects /> } />
              <Route exact  path='/gallery' element={ <Gallery /> } />
              <Route exact  path='/contact' element={ <Contact /> } />
              <Route exact path='/login' element={ <Login/> } /> 
              <Route exact path='/addproject' element={ <ProtectedRoute><AddProject /> </ProtectedRoute>} />
              <Route exact path='/editproject/:id' element={ <ProtectedRoute><AddProject /> </ProtectedRoute>} />
              <Route exact path='/dashboard' element={ <ProtectedRoute><Dashboard /> </ProtectedRoute>} />
              <Route exact path='/userAdmin' element={ <ProtectedRoute><UserAdmin/> </ProtectedRoute>} />
              <Route exact path='/applicationPages' element={ <ProtectedRoute> <ApplicationPages/></ProtectedRoute>} />
            </Routes>
          {/* <Footer /> */}
          {window.location.pathname === "/login" || window.location.pathname === "/dashboard" || window.location.pathname === "/addproject" ? null : <Footer /> }
          </BrowserRouter>
        </>
  );
}
export default App;
