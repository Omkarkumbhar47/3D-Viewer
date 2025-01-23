// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.js"; // Import Layout component
import Home from "./pages/Home.js";
import Settings from "./pages/Settings.js";
import ModelManagement from "./pages/ModelManagement.js";
import ErrorPage from "./pages/ErrorPage.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/settings"
          element={
            <Layout>
              <Settings />
            </Layout>
          }
        />
        <Route
          path="/models"
          element={
            <Layout>
              <ModelManagement />
            </Layout>
          }
        />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
    // <div className="h-100 w-100">
    //   <Router>
    //     <Routes>
    //       <Route
    //         path="/"
    //         element={
    //           <Layout>
    //             <Home />
    //           </Layout>
    //         }
    //       />
    //       <Route
    //         path="/settings"
    //         element={
    //           <Layout>
    //             <Settings />
    //           </Layout>
    //         }
    //       />
    //       <Route
    //         path="/models"
    //         element={
    //           <Layout>
    //             <ModelManagement />
    //           </Layout>
    //         }
    //       />
    //       <Route path="*" element={<ErrorPage />} />
    //     </Routes>
    //   </Router>
    // </div>
  );
}

export default App;
