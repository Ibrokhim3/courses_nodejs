import { useState, createContext, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/navabar";
import Courses from "./components/course-table";
import Register from "./components/auth/auth_register";
import Login from "./components/auth/auth_login";

import "./App.css";

export const MyContext = createContext();

function App() {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <MyContext.Provider value={{ isLogin, setIsLogin }}>
      <Router>
        <div>
          <Navbar />
          <Routes>
            <Route exact path="/login" element={<Login />} />
            <Route
              exact
              path="/courses"
              element={localStorage.getItem("token") && <Courses />}
            />
            <Route exact path="/register" element={<Register />} />
          </Routes>
        </div>
      </Router>
    </MyContext.Provider>
  );
}

export default App;
