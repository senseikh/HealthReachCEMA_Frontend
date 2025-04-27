import React from "react";

const Hero: React.FC = () => {
  return (
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
  );
};

export default Hero;
