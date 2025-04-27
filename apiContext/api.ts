import axios from "axios";
const api_url = "https://healthreachcema-backend.onrender.com/api/";
// const api_url =
//   process.env.NEXT_PUBLIC_API_URL_PROD || "http://localhost:8000/api/"; // Ensure this is set in your environment variables
const api = api_url;

console.log("api url", api);

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${api}auth/login/`, { email, password });
    console.log("Login response:", response.data);

    // Check if the response has the expected structure
    if (!response.data.access || !response.data.refresh) {
      console.error("Invalid response format:", response.data);
      throw new Error(
        "Invalid server response. Missing authentication tokens."
      );
    }

    // Store tokens in localStorage
    localStorage.setItem("access_token", response.data.access);
    localStorage.setItem("refresh_token", response.data.refresh);

    return response.data;
  } catch (error: any) {
    console.error("Login error:", error.response?.data || error.message);

    // Handle specific error cases
    if (error.response) {
      // The request was made and the server responded with a status code outside of 2xx
      if (error.response.status === 401) {
        throw new Error("Invalid email or password");
      } else if (error.response.data?.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error(`Authentication failed (${error.response.status})`);
      }
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error("No response from server. Please check your connection.");
    } else {
      // Something happened in setting up the request
      throw new Error(error.message || "Login failed");
    }
  }
};

export const register = async (userData: {
  username: string;
  email: string;
  password: string;
  password2: string;
  first_name?: string;
  last_name?: string;
}) => {
  const response = await axios.post(`${api}auth/register/`, userData);
  return response.data;
};

export const getClients = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${api}clients/`);
  return response.data;
};

export const createClient = async (clientData: any) => {
  const token = localStorage.getItem("access_token");
  console.log(token);
  const response = await axios.post(`${api}clients/`, clientData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export const getPrograms = async () => {
  const response = await axios.get(`${api}programs/`);
  return response.data;
};

export const createProgram = async (programData: any) => {
  const response = await axios.post(`${api}programs/`, programData);
  return response.data;
};

export const getEnrollments = async () => {
  const token = localStorage.getItem("access_token");
  const response = await axios.get(`${api}enrollments/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

// export const enrollClient = async (enrollmentData: any) => {
//   const response = await axios.post(`${api}enrollments/`, enrollmentData);
//   return response.data;
// };

export const enrollClient = async (enrollmentData: {
  client: string;
  program_id: string;
}) => {
  try {
    const token = localStorage.getItem("access_token");

    if (!token) {
      throw new Error("Authentication required. Please log in.");
    }

    console.log("Sending enrollment data:", enrollmentData);

    const response = await axios.post(
      `${api}enrollments/`,
      enrollmentData, // Now contains client and program_id
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Enrollment response:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Enrollment error:", error.response?.data || error.message);

    if (error.response?.data) {
      // Extract error message from the response
      const errorMsg =
        typeof error.response.data === "object"
          ? Object.values(error.response.data).flat().join(", ")
          : error.response.data.toString();

      throw new Error(errorMsg);
    }

    throw new Error(error.message || "Failed to enroll client");
  }
};

export const getClientProfile = async (clientId: string) => {
  const response = await axios.get(`${api}clients/${clientId}/`);
  return response.data;
};
export const Logout = async () => {};
