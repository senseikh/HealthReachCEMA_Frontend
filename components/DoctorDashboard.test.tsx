// // frontend/tests/components/DoctorDashboard.test.tsx
// import { render, screen } from "@testing-library/react";
// import DoctorDashboard from "../../components/DoctorDashboard";
// import { getClients, getPrograms } from "@/apiContext/api";

// jest.mock("@/apiContext/api");

// test("renders DoctorDashboard", async () => {
//   (getClients as jest.Mock).mockResolvedValue({ results: [] });
//   (getPrograms as jest.Mock).mockResolvedValue([]);

//   render(<DoctorDashboard />);
//   expect(screen.getByText("Doctor Dashboard")).toBeInTheDocument();
// });
