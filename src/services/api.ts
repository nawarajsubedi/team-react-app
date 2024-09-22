import { API_URL } from "../common/constants";
import { getSession } from "./AuthService";

const fetchWithAuth = async (url: string, options: RequestInit = {}): Promise<Response> => {
  const session = getSession();
  const token = session?.token;

  const headers = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}/api/v1/${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorMessage = await response.text();
    throw new Error(`Network response was not ok: ${errorMessage}`);
  }

  return response;
};

export default fetchWithAuth;
