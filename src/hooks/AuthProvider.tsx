import React, { ReactNode } from "react";

import { User } from "../common/types/user";
import {
  getSession,
  isAuth,
  login,
  logout,
  sendPasswordReset,
  addUser,
} from "../services/AuthService";

export interface AuthContextType {
  getSession: () => any;
  isAuth: () => boolean;
  login: (username: string, password: string) => Promise<string>;
  logout: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  addUser: (user: Omit<User, "id">) => Promise<User>;
}

export const AuthContext = React.createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth: AuthContextType = {
    getSession,
    isAuth,
    login,
    logout,
    sendPasswordReset,
    addUser,
  };

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
