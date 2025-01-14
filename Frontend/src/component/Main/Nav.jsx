import React, { useState, useEffect, useRef } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaWallet,
  FaTag,
  FaRegUserCircle,
  FaBars,
} from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "../../index.css";

const Navbar = ({ UserDetails }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null); // Reference for the mobile menu
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    console.log("Searching for:", searchQuery);
    // Implement search logic here
  };

  // Close mobile menu if user clicks outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
<nav className="flex justify-between items-center p-4" style={{ backgroundImage: 'linear-gradient(to left top, #b5d8d8, #91d6d0, #6ad2c1, #42cead, #07c993)' }}>
      {/* Left: Company Logo */}
      <div className="flex items-center">
        <Link to="/">
          <img
            src="https://i.ibb.co/bBC4nfj/download-1.png"
            alt="Company Logo"
            className="h-12 sm:h-14 md:h-16 lg:h-18 xl:h-20 2xl:h-24 transform hover:scale-125 transition-transform duration-200"
          />
        </Link>
      </div>

      {/* Center: Search Bar */}
      <div className="flex justify-center mx-auto w-full md:w-3/4 lg:w-1/2">
        <form
          onSubmit={handleSearchSubmit}
          className="flex w-full bg-gray-100 p-2 rounded-full transform hover:scale-110 transition-transform duration-200"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search for products..."
            className="w-full p-2 bg-transparent border-none rounded-full focus:outline-none text-gray-700"
          />
          <button type="submit" className="p-2 text-blue hover:text-blue transform hover:scale-150 transition-transform duration-200">
            <FaSearch className="hover:text-blue" />
          </button>
        </form>
      </div>


      {/* Right: Cart, Favorites, and Deals (Desktop and Mobile Menu) */}
      <div className="hidden md:flex items-center space-x-6">
        {/* User profile */}
        <Link to={UserDetails == null ? "/login" : "/profile"}>
          <FaRegUserCircle
            className="text-gray-800 cursor-pointer hover:text-white transform hover:scale-150 transition-transform duration-200"
            size={30}
          />
        </Link>

        {/* Greetings */}
        <div className="flex items-center space-x-6">
          {UserDetails == null ? (
            <button
              onClick={() => navigate("/login")}
              className="text-white hover:underline text-xl"
            >
              Login
            </button>
          ) : (
            <>
              <Link to="/profile">
                <div className="text-xl text-gray-800 cursor-pointer hover:text-white transform hover:scale-110 transition-transform duration-200">
                  Hello, {UserDetails.name}
                </div>
              </Link>
              <Link to="/orders">
                <FaShoppingCart className="text-xl text-gray-800 cursor-pointer hover:text-white transform hover:scale-150 transition-transform duration-200" />
              </Link>
              <Link to="/wallet">
              <FaWallet className="text-xl text-gray-800 cursor-pointer hover:text-white transform hover:scale-150 transition-transform duration-200" />
              </Link>
            </>
          )}

          <Link to="/offers">
            <FaTag className="text-xl text-gray-800 cursor-pointer hover:text-white transform hover:scale-150 transition-transform duration-200" />
          </Link>
        </div>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden flex items-center">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-gray-800 hover:text-white focus:outline-none"
        >
          <FaBars size={30} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef} // Attach the reference to the mobile menu
          className="absolute top-16 right-0 bg-white w-48 shadow-lg md:hidden flex flex-col p-4 space-y-4 z-10"
        >
          {UserDetails ? (
            <>
              <Link to="/profile">
                <FaRegUserCircle
                  className="text-gray-800 cursor-pointer hover:text-white pr-4 inline"
                  size={40}
                />
                Profile
              </Link>
              <Link to="/mycart">
                <FaShoppingCart
                  className="text-xl text-gray-800 cursor-pointer hover:text-white pr-4 inline"
                  size={40}
                />
                My Cart
              </Link>
              <Link to="/mywishlist">
                <FaWallet
                  className="text-xl text-gray-800 cursor-pointer hover:text-white pr-4 inline"
                  size={40}
                />
                My Wishlist
              </Link>
            </>
          ) : (
            <Link to='/login'>
              <FaRegUserCircle
                className="text-xl text-gray-800 cursor-pointer hover:text-white pr-4 inline"
                size={40}
              />
              Login
            </Link>
          )}
          <Link to="/offers">
            <FaTag
              className="text-xl text-gray-800 cursor-pointer hover:text-white pr-4 inline"
              size={40}
            />
            Offers
          </Link>
        </div>
      )}
    </nav>
  );
};

export { Navbar };