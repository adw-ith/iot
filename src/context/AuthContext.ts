// contexts/AuthContext.tsx
"use client";
import { createContext, useState, useContext, ReactNode } from "react";

interface AuthContextType {
  signedIn: boolean;
  setSignedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [signed, setSigned] = useState(false);

  return (
    <AuthContext.Provider value={{ signed, setSigned }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
