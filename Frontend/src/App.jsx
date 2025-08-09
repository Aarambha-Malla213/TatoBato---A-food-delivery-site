import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Profile from "./pages/Profile/profile";
import EditProfile from "./pages/EditProfile/EditProfile";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import SearchResults from "./pages/SearchResults/SearchResults";
import Footer from "./components/Footer/Footer";
import LogInPopUp from "./components/LogInPopUP/LogInPopUp";
import ContactUsPopUp from "./components/ContactUsPopUp/ContactUsPopUp";
import { StoreContext } from "./context/StoreContext";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  const { showLogin, setShowLogin, showContactUs, setShowContactUs } =
    useContext(StoreContext);

  return (
    <>
      {showLogin && <LogInPopUp setShowLogin={setShowLogin} />}
      {showContactUs && <ContactUsPopUp setShowContactUs={setShowContactUs} />}
      
      <Navbar setShowLogin={setShowLogin} />
      
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <PrivateRoute>
                <EditProfile />
              </PrivateRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </div>
      
      <Footer />
    </>
  );
};

export default App;
