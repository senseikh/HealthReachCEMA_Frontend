"use client";
import React from "react";
import { useState } from "react";
import Link from "next/link";

const Hero: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Check if access_token exists in localStorage
  const isLoggedIn = !!localStorage.getItem("access_token");

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <>
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
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>
          <div
            className={`md:flex md:space-x-6 ${
              isOpen ? "block" : "hidden"
            } md:block absolute md:static top-16 left-0 right-0 bg-neutral-900 md:bg-transparent p-4 md:p-0 z-10`}
          >
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
          </div>
        </div>
      </nav>

      <section className="bg-gray-100 text-gray-800 min-h-screen flex flex-col items-center justify-center p-8">
        <div className="container mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold">
            HealthSync System CEMA
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Empower doctors to manage clients and health programs efficiently.
            Register clients, enroll them in programs, and access profiles
            seamlessly.
          </p>
        </div>

        <div className="overflow-y-auto max-h-60 mt-8 p-4 bg-white shadow-lg rounded-lg w-full max-w-3xl">
          <ul className="space-y-4">
            <li className="text-gray-700 font-medium">
              ✔ Create and manage health programs (e.g., TB, HIV, Malaria)
            </li>
            <li className="text-gray-700 font-medium">
              ✔ Register and search clients easily
            </li>
            <li className="text-gray-700 font-medium">
              ✔ Enroll clients in multiple programs
            </li>
            <li className="text-gray-700 font-medium">
              ✔ View detailed client profiles
            </li>
            <li className="text-gray-700 font-medium">
              ✔ Secure API for external system integration
            </li>
          </ul>
        </div>
      </section>

      <footer className="bg-neutral-900 text-white py-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} HealthSync. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Hero;
