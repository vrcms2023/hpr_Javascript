
import './App.css';
import Footer from './Common/Footer';
import Header from './Common/Header';

import Home from './Frontend/Pages/Home';
import About from './Frontend/Pages/About'
import Projects from './Frontend/Pages/Projects';
import Gallery from './Frontend/Pages/Gallery';
import Contact from './Frontend/Pages/Contact';
import Login from './Admin/Pages/Login/Login';
import Dashboard from './Admin/Pages/Login/Dashboard';
import AddProject from './Admin/Pages/Login/AddProject';
import ProtectedRoute from './Frontend/Components/ProtectedRoute';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  
  return (
        <>
          <BrowserRouter>
          <Header />
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
            </Routes>
            </BrowserRouter>
          <Footer />
          {/* 
          <Home />
          <Gallery /> 
          <Contact />
          <Projects /> */}
          {/* 
          <Login />
          <Dashboard /> 
          <AddProject />  */} 
        </>
  );
}

export default App;
