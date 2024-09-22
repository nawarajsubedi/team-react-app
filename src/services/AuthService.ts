import { API_URL } from "../common/constants";
import { User, SessionUser } from "../common/types/user";

const keyUser = "authx.user";

const setSession = (user: User, token: string): void => {
  const { password, ...rest } = user;
  const sessionData: SessionUser = { ...rest, token };
  localStorage.setItem(keyUser, JSON.stringify(sessionData));
};

const getSession = (): SessionUser | null => {
  try {
    const user = localStorage.getItem(keyUser);
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Failed to parse session data:", error);
    return null;
  }
};

const isAuth = (): boolean => !!getSession();

const handleResponse = async (response: Response): Promise<any> => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData?.message || "An error occurred");
  }
  return response.json();
};

const login = async (username: string, password: string): Promise<string> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const { data } = await handleResponse(response);
    if (!data.token) {
      throw new Error("No token received");
    }

    const user: User = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
    };

    setSession(user, data.token);
    return data.token;
  } catch (error: any) {
    console.error("Login error:", error);
    throw new Error(error.message || "Login failed");
  }
};

const logout = async (): Promise<void> => {
  localStorage.removeItem(keyUser);
};

const sendPasswordReset = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(resolve, 1000);
  });
};

const addUser = async (user: Omit<User, "id">): Promise<User> => {
  try {
    const response = await fetch(`${API_URL}/api/v1/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    });

    const data = await handleResponse(response);
    return {
      id: data.id,
      username: data.username,
      email: data.email,
    };
  } catch (error: any) {
    throw new Error(error.message || "Failed to register user");
  }
};

export { getSession, isAuth, login, logout, sendPasswordReset, addUser };
