// App.js
import React, { useState } from "react";
import {
  Routes,
  Route,
  BrowserRouter as Router,
  Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import JobListPage from "./components/JobListPage";
import JobDetailPage from "./components/JobDetailPage";
import "./App.css";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);

  const handleLogin = (token) => {
    setAccessToken(token);
  };

  const PrivateRoute = ({ element }) => {
    return accessToken ? element : <Navigate to="/" />;
  };

  return (
    <Router>
      <div className="app">
        <header className="header">
          <h2>GitHub Jobs</h2>
        </header>
        <main className="main-content">
          <div>
            <Routes>
              <Route path="/" element={<LoginPage onLogin={handleLogin} />} />
              <Route
                path="/jobs/*"
                element={
                  <PrivateRoute
                    element={<JobListPage accessToken={accessToken} />}
                  />
                }
              />
              <Route
                path="/jobdetail/:id"
                element={<PrivateRoute element={<JobDetailPage />} />}
              />
            </Routes>
          </div>
        </main>
        <footer className="footer">2023 all rights reserved</footer>
      </div>
    </Router>
  );
};

export default App;
