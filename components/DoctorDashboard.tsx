"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getClients, getPrograms, getEnrollments } from "@/apiContext/api";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ClientForm from "./ClientForm";
import ProgramForm from "./ProgramForm";
import EnrollmentForm from "./EnrollmentForm";
import ClientSearch from "./ClientSearch";
import {
  Search,
  Users,
  Calendar,
  User,
  Home,
  Settings,
  Menu,
  X,
  BarChart,
  TrendingUp,
} from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DoctorDashboard: React.FC = () => {
  const [clients, setClients] = useState([]);
  const [programs, setPrograms] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeForm, setActiveForm] = useState<string | null>("dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsData = await getClients();
        const programsData = await getPrograms();
        const enrollmentsData = await getEnrollments();
        setClients(clientsData.results || []);
        setPrograms(programsData);
        setEnrollments(enrollmentsData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // Process enrollments to count per program
  const enrollmentCounts = programs.map((program: any) => {
    const count = enrollments.filter(
      (enrollment: any) => enrollment.program.id === program.id
    ).length;
    return { program: program.name, count };
  });

  const chartData = {
    labels: programs.map((p: any) => p.name),
    datasets: [
      {
        label: "Enrollments",
        data: enrollmentCounts.map((ec: any) => ec.count),
        backgroundColor: "rgba(37, 99, 235, 0.6)",
      },
    ],
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleFormChange = (formName: string) => {
    setActiveForm(formName);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredClients = clients.filter((client: any) => {
    const fullName = `${client.first_name} ${client.last_name}`.toLowerCase();
    return fullName.includes(searchQuery.toLowerCase());
  });

  const renderActiveContent = () => {
    switch (activeForm) {
      case "dashboard":
        return (
          <div className="space-y-6">
            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Total Clients Card */}
              <div className="bg-blue-100 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-blue-800 flex items-center">
                  <Users className="mr-2" size={20} />
                  Total Clients
                </h3>
                <p className="text-3xl font-bold text-blue-900 mt-2">
                  {clients.length}
                </p>
                <p className="text-sm text-blue-700 mt-2 flex items-center">
                  <TrendingUp className="mr-1" size={16} />
                  3% increase in the past 3 days
                </p>
              </div>

              {/* Total Programs Card */}
              <div className="bg-green-100 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-green-800 flex items-center">
                  <Calendar className="mr-2" size={20} />
                  Total Programs
                </h3>
                <p className="text-3xl font-bold text-green-900 mt-2">
                  {programs.length}
                </p>
              </div>

              {/* Enrollment Metrics Card */}
              <div className="bg-purple-100 p-6 rounded-lg shadow">
                <h3 className="text-lg font-semibold text-purple-800 flex items-center">
                  <BarChart className="mr-2" size={20} />
                  Enrollment Metrics
                </h3>
                <ul className="mt-2 text-purple-900">
                  {enrollmentCounts.map((ec: any, index: number) => (
                    <li key={index} className="text-sm">
                      {ec.count} clients in {ec.program}
                    </li>
                  ))}
                  {enrollmentCounts.length === 0 && (
                    <li className="text-sm">No enrollments yet</li>
                  )}
                </ul>
              </div>
            </div>

            {/* Chart and Recent Clients */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <BarChart className="mr-2" size={20} />
                  Program Enrollments
                </h2>
                <Bar data={chartData} />
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <Users className="mr-2" size={20} />
                  Recent Clients
                </h2>
                <ul className="divide-y">
                  {filteredClients.slice(0, 5).map((client: any) => (
                    <li key={client.id} className="py-3">
                      <Link
                        href={`/client/${client.id}`}
                        className="text-blue-600 hover:text-blue-800 flex items-center"
                      >
                        <User className="mr-2" size={16} />
                        {client.first_name} {client.last_name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* All Clients Table */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Users className="mr-2" size={20} />
                All Clients
              </h2>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        First Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date of Birth
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Gender
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrolled Programs
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClients.map((client: any) => (
                      <tr key={client.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          <Link
                            href={`/client/${client.id}`}
                            className="text-blue-600 hover:text-blue-800"
                          >
                            {client.first_name}
                          </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.last_name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.date_of_birth}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.gender}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.contact_number}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {client.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {client.enrollments
                            .map((enrollment: any) => enrollment.program.name)
                            .join(", ") || "None"}
                        </td>
                      </tr>
                    ))}
                    {filteredClients.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-6 py-4 text-center text-sm text-gray-500"
                        >
                          No clients found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        );
      case "client":
        return <ClientForm />;
      case "program":
        return <ProgramForm />;
      case "enrollment":
        return <EnrollmentForm />;
      case "search":
        return <ClientSearch />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "w-64" : "w-0 -translate-x-full"
        } bg-gray-800 text-white transition-transform duration-300 fixed top-0 left-0 h-full z-30 md:w-64 md:translate-x-0 md:static`}
      >
        <div className="p-4 flex justify-between items-center">
          <h1
            className={`font-bold text-lg ${
              !sidebarOpen && "hidden"
            } text-white`}
          >
            Medical Portal
          </h1>
          <button onClick={toggleSidebar} className="md:hidden text-gray-300">
            <X size={24} />
          </button>
        </div>
        <nav className={`mt-6 ${!sidebarOpen && "hidden"}`}>
          <div className="px-4 space-y-2">
            <button
              onClick={() => handleFormChange("dashboard")}
              className={`w-full text-left flex items-center py-2 px-3 rounded-lg text-sm ${
                activeForm === "dashboard"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Home className="mr-3" size={18} />
              Dashboard
            </button>
            <button
              onClick={() => handleFormChange("client")}
              className={`w-full text-left flex items-center py-2 px-3 rounded-lg text-sm ${
                activeForm === "client"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <User className="mr-3" size={18} />
              Register Client
            </button>
            <button
              onClick={() => handleFormChange("program")}
              className={`w-full text-left flex items-center py-2 px-3 rounded-lg text-sm ${
                activeForm === "program"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Calendar className="mr-3" size={18} />
              Create Program
            </button>
            <button
              onClick={() => handleFormChange("enrollment")}
              className={`w-full text-left flex items-center py-2 px-3 rounded-lg text-sm ${
                activeForm === "enrollment"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Users className="mr-3" size={18} />
              Enroll Client
            </button>
            <button
              onClick={() => handleFormChange("search")}
              className={`w-full text-left flex items-center py-2 px-3 rounded-lg text-sm ${
                activeForm === "search"
                  ? "bg-gray-700 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              <Search className="mr-3" size={18} />
              Advanced Search
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <header className="bg-white border-b shadow-sm">
          <div className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center">
              <button
                onClick={toggleSidebar}
                className="mr-4 md:hidden text-gray-600"
              >
                <Menu size={24} />
              </button>
              <h2 className="text-xl font-semibold text-gray-800">
                Doctor Dashboard
              </h2>
            </div>
            <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
              <Search size={18} className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search clients..."
                className="bg-transparent border-none focus:outline-none w-full"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 overflow-y-auto p-6">
          {renderActiveContent()}
        </main>
      </div>
    </div>
  );
};

export default DoctorDashboard;
