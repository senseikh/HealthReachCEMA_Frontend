import ClientDashboard from "@/components/ClientDashboard";
import { redirect } from "next/navigation";

export default function ClientPage() {
  // Check if the user is logged in and has the right role
  const isLoggedIn = !!localStorage.getItem("access_token");
  <p> welcome doc...</p>;

  return <ClientDashboard clientId={""} />;
}
