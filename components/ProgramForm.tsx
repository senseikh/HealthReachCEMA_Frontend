"use client";

import React, { useState } from "react";
import { createProgram } from "@/apiContext/api";

const ProgramForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createProgram(formData);
      alert("Program created successfully");
      setFormData({ name: "", description: "", start_date: "", end_date: "" });
    } catch (error) {
      alert("Error creating program");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Create Program
      </h2>

      <div className="space-y-5">
        <div>
          <label
            className="block mb-1 text-gray-700 font-medium"
            htmlFor="name"
          >
            Program Name
          </label>
          <input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter Program Name"
            className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label
            className="block mb-1 text-gray-700 font-medium"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Description"
            className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3"
            rows={4}
            required
          />
        </div>

        <div>
          <label
            className="block mb-1 text-gray-700 font-medium"
            htmlFor="start_date"
          >
            Start Date
          </label>
          <input
            id="start_date"
            name="start_date"
            type="date"
            value={formData.start_date}
            onChange={handleChange}
            className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label
            className="block mb-1 text-gray-700 font-medium"
            htmlFor="end_date"
          >
            End Date
          </label>
          <input
            id="end_date"
            name="end_date"
            type="date"
            value={formData.end_date}
            onChange={handleChange}
            className="w-full border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Program"}
        </button>
      </div>
    </form>
  );
};

export default ProgramForm;
