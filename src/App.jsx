import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Navbar from "./components/Navbar";
import Explore from "./pages/Explore";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Offers from "./pages/Offers";
import Profile from "./pages/Profile";
import Category from "./pages/Category";
import CreateListings from "./pages/CreateListings";
import Listing from "./pages/Listing";
import PrivateRoutes from "./components/PrivateRoutes";

const App = () => {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Explore />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route path="/profile" element={<PrivateRoutes />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/create-listing" element={<CreateListings />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/category/:categoryName/:listingId"
            element={<Listing />}
          />
        </Routes>
      </Router>
      <ToastContainer hideProgressBar={true} />
    </>
  );
};
export default App;
