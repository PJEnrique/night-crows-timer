import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import RookServer from "./assets/pages/rookServer.jsx"; // Adjusted path
import BishopServer from "./assets/pages/bishopServer.jsx"; // Adjusted path
import KnightServer from "./assets/pages/knightServer.jsx"; // Adjusted path
import NavDrawer from "./assets/layout/NavDrawer.jsx"; // Adjusted path
import Login from "./assets/pages/login.jsx"; // Adjusted path
import Register from "./assets/pages/register.jsx"; // Adjusted path
import { useAuth } from "./assets/context/AuthContext.jsx"; // Adjusted path
import Footer from "../src/assets/layout/footer.jsx"; // Adjusted path to Footer component

const App = () => {
  const { currentUser } = useAuth(); // Access the currentUser from AuthContext
  const closeDrawer = () => {
    console.log("Drawer closed");
    // Additional logic to close the drawer if needed
  };

  return (
    <Router>
      {currentUser && <NavDrawer onClose={closeDrawer} />}
      <Routes>
        <Route exact path="/" element={!currentUser ? <Login /> : <Navigate to="/user/rookServer" />} />
        <Route path="/register" element={!currentUser ? <Register /> : <Navigate to="/user/rookServer" />} />
        
        <Route path="/user/rookServer" element={currentUser ? <RookServer /> : <Navigate to="/" />} />
        <Route path="/user/bishopServer" element={currentUser ? <BishopServer /> : <Navigate to="/" />} />
        <Route path="/user/knightServer" element={currentUser ? <KnightServer /> : <Navigate to="/" />} />
      </Routes>
      
      <Footer /> {/* Include Footer component here */}
    </Router>
  );
};

export default App;
