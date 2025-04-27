"use client";

import Link from "next/link";

const Footer: React.FC = () => {
  const isLoggedIn = !!localStorage.getItem("access_token");

  // Do not render the footer if the user is logged in
  if (isLoggedIn) {
    return null;
  }

  return (
    <footer className="bg-neutral-900 text-white p-6 mt-auto">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-2">About Health System</h3>
          <p className="text-sm text-gray-300">
            Health System is dedicated to managing health programs and client
            care with efficiency and precision.
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm text-gray-300">
            <li>
              <Link href="/" className="hover:text-white transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-white transition">
                About
              </Link>
            </li>
            <li>
              <Link href="/use-case" className="hover:text-white transition">
                Use Case
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white transition">
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Support</h3>
          <p className="text-sm text-gray-300">
            Email: support@healthsystem.com
          </p>
          <p className="text-sm text-gray-300">Phone: (123) 456-7890</p>
        </div>
      </div>
      <div className="text-center mt-6 text-gray-400 text-sm">
        <p>© 2025 Health Information System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
