import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.js"; 

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Layout></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
