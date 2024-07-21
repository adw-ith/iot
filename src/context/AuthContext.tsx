"use client";
import { createContext, useState, useContext, ReactNode } from "react";
import { User } from "@/types/types";
import { useLocalStorage } from "@/hooks/useLocalStorage";

interface AuthContextType {
  user: User | undefined;
  setUser: (value: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useLocalStorage<User | undefined>("user", undefined);
  return (
    <AuthContext.Provider value={{ user, setUser }}>
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
