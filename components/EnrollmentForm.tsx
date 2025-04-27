// This component is responsible for enrolling a client in a program.

"use client";

import React, { useState, useEffect } from "react";
import { getClients, getPrograms, enrollClient } from "@/apiContext/api";

const EnrollmentForm: React.FC = () => {
  const [clients, setClients] = useState<any[]>([]);
  const [programs, setPrograms] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    client: "",
    program_id: "", // Changed from 'program' to 'program_id'
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getClients();
        const programsData = await getPrograms();
        setClients(clientsData.results || clientsData || []);
        setPrograms(programsData.results || programsData || []);
        console.log("Clients:", clientsData);
        console.log("Programs:", programsData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setMessage({
          text: "Failed to load clients or programs",
          type: "error",
        });
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    console.log("Submitting enrollment data:", formData);

    if (!formData.client || !formData.program_id) {
      setMessage({
        text: "Please select both a client and a program",
        type: "error",
      });
      setLoading(false);
      return;
    }

    try {
      // Send exactly what the backend expects: client and program_id
      const result = await enrollClient({
        client: formData.client,
        program_id: formData.program_id,
      });

      console.log("Enrollment result:", result);
      setMessage({
        text: "Client enrolled successfully!",
        type: "success",
      });
      setFormData({ client: "", program_id: "" });
    } catch (error: any) {
      console.error("Error enrolling client:", error);
      setMessage({
        text: error.message || "Error enrolling client. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    console.log(`Changed ${name} to ${value}`);
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow-md max-w-lg mx-auto"
    >
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Enroll Client
      </h2>

      {message.text && (
        <div
          className={`mb-4 p-3 rounded ${
            message.type === "error"
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-5">
        <div>
          <label
            className="block mb-1 text-gray-700 font-medium"
            htmlFor="client"
          >
            Select Client
          </label>
          <select
            id="client"
            name="client"
            value={formData.client}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3"
            required
          >
            <option value="">-- Choose Client --</option>
            {clients.length > 0 ? (
              clients.map((client: any) => (
                <option key={client.id} value={client.id}>
                  {client.first_name} {client.last_name}
                </option>
              ))
            ) : (
              <option disabled>No clients available</option>
            )}
          </select>
        </div>

        <div>
          <label
            className="block mb-1 text-gray-700 font-medium"
            htmlFor="program_id"
          >
            Select Program
          </label>
          <select
            id="program_id"
            name="program_id"
            value={formData.program_id}
            onChange={handleChange}
            className="w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 rounded-lg p-3"
            required
          >
            <option value="">-- Choose Program --</option>
            {programs.length > 0 ? (
              programs.map((program: any) => (
                <option key={program.id} value={program.id}>
                  {program.name}
                </option>
              ))
            ) : (
              <option disabled>No programs available</option>
            )}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
        >
          {loading ? "Enrolling..." : "Enroll Client"}
        </button>
      </div>
    </form>
  );
};

export default EnrollmentForm;
