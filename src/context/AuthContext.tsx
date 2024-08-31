import React, { createContext, useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useRouter } from "next/navigation";
import api from "@/utils/api";

interface AuthContextProps {
  isAuthenticated: boolean;
  signIn: (values: { email: string; password: string }) => Promise<boolean>;
  signOut: () => void;
  isLoading: boolean;
  getAuthToken: () => string | undefined;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [cookie, setCookie] = useCookies(["userdata"]);
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && cookie.userdata) {
      api.defaults.headers.common["Authorization"] = cookie.userdata;
      setIsAuthenticated(true);
    }
  }, [cookie, isAuthenticated]);

  const signIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }): Promise<boolean> => {
    try {
      setIsLoading(true);
      const { data } = await api.post(
        "/auth/login",
        {
          username: email,
          password: password,
        },
        { auth: { username: email, password: password } },
      );

      if (data) {
        const token = `Bearer ${data}`;
        api.defaults.headers["Authorization"] = token;
        setCookie("userdata", token);
        setIsAuthenticated(true);
        router.push("/dashboard");

        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = () => {
    setCookie("userdata", null);
    delete api.defaults.headers.common["Authorization"];
    setIsAuthenticated(false);
    router.push("/login");
  };

  const getAuthToken = () => {
    return cookie.userdata;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        signIn,
        signOut,
        isLoading,
        getAuthToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
