"use client";
import { useState } from "react";
import Link from "next/link"; 

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Checks if access_token exists in localStorage
  const isLoggedIn = !!localStorage.getItem("access_token");

  const Logout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/login"; // Redirect to login page
  };

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-neutral-900 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="text-2xl font-semibold tracking-wide hover:text-gray-300 transition"
        >
          Health System
        </Link>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="focus:outline-none text-white hover:text-gray-400"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:flex md:space-x-6 ${
            isOpen ? "block" : "hidden"
          } md:block absolute md:static top-16 left-0 right-0 bg-neutral-900 md:bg-transparent p-4 md:p-0 z-10`}
        >
          {isLoggedIn ? (
            <>
              <Link
                href="/doctor"
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                Doctor Dashboard
              </Link>
              <button
                onClick={Logout}
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/about"
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                About
              </Link>
              <Link
                href="/use-case"
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                Use Case
              </Link>
              <Link
                href="/contact"
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block md:inline-block hover:text-gray-300 py-2 md:py-0 transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
