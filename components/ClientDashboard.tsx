"use client";
import React, { useEffect, useState } from "react";
import { getClientProfile } from "@/apiContext/api";

interface ClientDashboardProps {
  clientId?: string; // Optional, for doctor viewing client profiles
}

const ClientDashboard: React.FC<ClientDashboardProps> = ({ clientId }) => {
  const [profile, setProfile] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // If clientId is provided (e.g., doctor viewing a client), use it
        // Otherwise, fetch the profile of the authenticated client
        const id = clientId || "me"; // Backend should handle 'me' to return the authenticated client's profile
        const profileData = await getClientProfile(id);
        setProfile(profileData);
      } catch (err: any) {
        setError("Error fetching profile");
      }
    };
    fetchProfile();
  }, [clientId]);

  if (error) return <div className="text-red-500 p-6">{error}</div>;
  if (!profile) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Client Dashboard</h1>
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-lg font-semibold">Profile</h2>
        <p>
          Name: {profile.first_name} {profile.last_name}
        </p>
        <p>Email: {profile.email}</p>
        <h3 className="mt-4 font-semibold">Enrolled Programs</h3>
        <ul>
          {profile.enrollments.map((enrollment: any) => (
            <li key={enrollment.id}>
              {enrollment.program.name} - {enrollment.status}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ClientDashboard;
