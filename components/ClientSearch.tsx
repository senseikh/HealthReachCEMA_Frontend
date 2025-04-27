"use client";

import React, { useState } from "react";
import { getClients } from "@/apiContext/api";
import Link from "next/link";

const ClientSearch: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await getClients();
      const filtered = response.results.filter(
        (client: any) =>
          client.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setResults(filtered);
    } catch (error) {
      console.error("Error searching clients:", error);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-4">Search Clients</h2>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name or email"
          className="p-2 border rounded flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-primary text-white p-2 rounded"
        >
          Search
        </button>
      </div>
      <ul>
        {results.map((client: any) => (
          <li key={client.id} className="py-2">
            <Link
              href={`/client/${client.id}`}
              className="text-primary hover:underline"
            >
              {client.first_name} {client.last_name} - {client.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientSearch;
