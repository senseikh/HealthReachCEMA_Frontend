"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/apiContext/api";
import Link from "next/link";

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
    first_name: "",
    last_name: "",
  });
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register(formData);
      alert("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: any) {
      setError(
        err.response?.data?.password ||
          JSON.stringify(err.response?.data) ||
          "Registration failed"
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex items-center justify-center min-h-screen  text-white px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-neutral-800 p-6 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        {[
          { name: "username", label: "Username", type: "text" },
          { name: "email", label: "Email", type: "email" },
          { name: "password", label: "Password", type: "password" },
          { name: "password2", label: "Confirm Password", type: "password" },
          { name: "first_name", label: "First Name", type: "text" },
          { name: "last_name", label: "Last Name", type: "text" },
        ].map(({ name, label, type }) => (
          <div className="mb-4" key={name}>
            <label className="block text-sm font-medium text-gray-300">
              {label}
            </label>
            <input
              type={type}
              name={name}
              value={(formData as any)[name]}
              onChange={handleChange}
              className="w-full p-2 border border-gray-600 rounded bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-gray-500"
              required={name !== "first_name" && name !== "last_name"}
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-gray-700 hover:bg-gray-600 text-white p-2 rounded transition"
        >
          Register
        </button>
        <p className="mt-4 text-center text-gray-400 text-sm">
          Already have an account?{" "}
          <Link href="/login" className="text-gray-300 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
