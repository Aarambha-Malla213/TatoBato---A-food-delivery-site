import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import PlaceOrder from "./pages/PlaceOrder/PlaceOrder";
import Footer from "./components/Footer/Footer";
import LogInPopUp from "./components/LogInPopUP/LogInPopUp";
import ContactUsPopUp from "./components/ContactUsPopUp/ContactUsPopUp";
import { StoreContext } from "./context/StoreContext";

const App = () => {
  const { showLogin, setShowLogin, showContactUs, setShowContactUs } = React.useContext(StoreContext);

  return (
    <>
      {showLogin ? <LogInPopUp setShowLogin={setShowLogin} /> : <></>}
      {showContactUs ? <ContactUsPopUp setShowContactUs={setShowContactUs} /> : <></>}
      <Navbar setShowLogin={setShowLogin} />
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<PlaceOrder />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
