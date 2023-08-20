import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Common/Footer/Footer";
import Header from "./Common/Header/Header";
import Home from "./Frontend/Pages/Home";
import About from "./Frontend/Pages/About";
import Projects from "./Frontend/Pages/Projects";
import Gallery from "./Frontend/Pages/Gallery";
import Contact from "./Frontend/Pages/Contact";
import Login from "./Admin/Pages/Login/Login";
import Dashboard from "./Admin/Pages/Login/Dashboard";
import AddProject from "./Admin/Pages/Login/AddProject";
import ProtectedRoute from "./Frontend/Components/ProtectedRoute";
import UserAdmin from "./Admin/Pages/Login/UserAdmin";
import MainPage from "./Admin/Pages/Login/MainPage";
import NewsAndUpdates from "./Frontend/Pages/NewsAndUpdates";
import { useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import AdminHeader from "./Admin/Components/Header/AdminHeader";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminTestimonial from "./Admin/Pages/Login/AdminTestimonial";
import Registration from "./Admin/Pages/Login/Registration";
import AuthForm from "./Admin/Pages/Login/AuthForm";
import AdminNews from "./Admin/Pages/Login/AdminNews";
import ProjectTabs from "./Frontend/Components/ProjectsTabs/ProjecTabs";
import { getCookie } from "./util/cookieUtil";

function App() {
  const { userInfo } = useSelector((state) => state.auth);
  const [loginState, setLoginState] = useState("");

  useEffect(() => {
    if (userInfo || getCookie("userToken")) {
      setLoginState(true);
    } else {
      setLoginState(false);
    }
  }, [userInfo]);

  return (
    <>
      <BrowserRouter>
        {loginState ? <AdminHeader /> : <Header />}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/projects" element={<Projects />} />
          <Route exact path="/projectDetails" element={<ProjectTabs />} />
          <Route exact path="/gallery" element={<Gallery />} />
          <Route exact path="/contact" element={<Contact />} />
          <Route exact path="/news" element={<NewsAndUpdates />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Registration />} />
          <Route exact path="/authForm" element={<AuthForm />} />
          <Route
            exact
            path="/main"
            element={
              <ProtectedRoute>
                {" "}
                <MainPage />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/addproject"
            element={
              <ProtectedRoute>
                <AddProject />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/editproject/:id"
            element={
              <ProtectedRoute>
                <AddProject />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/userAdmin"
            element={
              <ProtectedRoute>
                <UserAdmin />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/adminNews"
            element={
              <ProtectedRoute>
                {" "}
                <AdminNews />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            exact
            path="/testimonial"
            element={
              <ProtectedRoute>
                {" "}
                <AdminTestimonial />
              </ProtectedRoute>
            }
          />
        </Routes>
        {loginState ? null : <Footer />}
      </BrowserRouter>
      <ToastContainer autoClose={2000} theme="colored" />
    </>
  );
}

export default App;
