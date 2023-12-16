/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { API_ROUTES, ROUTES } from "../utils/routes";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUserDataContext } from "./user-context";

const AuthContext = createContext(undefined);

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return {
    isLoggedIn: context.isLoggedIn,
    onSignup: context.onSignup,
    onLogin: context.onLogin,
    onLogout: context.onLogout,
    errors: context.errors,
    jwtToken: context.jwtToken,
    checkingAuthState: context.checkingAuthState,
    loading: context.loading,
  };
}

const loginMutation = async (data) => {
  return axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:8888'}${API_ROUTES.Login}`, data);
};

const signupMutation = (data) => {
  const { confirmPassword, ...signUpData } = data;
  return axios.post(
    `${import.meta.env.VITE_API_URL || 'http://localhost:8888'}${API_ROUTES.Signup}`,
    signUpData
  );
};

const logoutMutation = (jwtToken) => {
  return axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:8888'}${API_ROUTES.Logout}`, {
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  });
};

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [errors, setErrors] = useState();
  const [jwtToken, setJwtToken] = useState("");
  const [checkingAuthState, setCheckingAuthState] = useState(true);
  const { setUserData } = useUserDataContext();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    const authToken = localStorage.getItem("token");
    if (userData && authToken) {
      setJwtToken(authToken);
      setIsLoggedIn(true);
    }
    setCheckingAuthState(false);
  }, []);

  const mutationLogin = useMutation({
    mutationFn: loginMutation,
    onSuccess: (data) => {
      localStorage.setItem("userData", JSON.stringify(data.data.user));
      localStorage.setItem("token", data.data.token);
      setJwtToken(data.data.token);
      setIsLoggedIn(true);
      setUserData(data.data.user);
      setLoading(false);
      navigate(ROUTES.RDV);
    },
    onError: (error) => {
      setErrors({
        loginErrors: error.response.data.message || "Something went wrong",
      });
      setLoading(false);
    },
  });

  const mutationSignup = useMutation({
    mutationFn: signupMutation,
    onSuccess: (data) => {
      const user = data.data.user;
      localStorage.setItem("userData", JSON.stringify(user));
      localStorage.setItem("token", data.data.token);
      setJwtToken(data.data.token);
      setIsLoggedIn(true);
      setUserData(data.data.user);
      setLoading(false);
      navigate(ROUTES.INFO_USER);
    },
    onError: (error) => {
      setErrors({
        signupErrors: error.response.data.message || "Something went wrong",
      });
      setLoading(false);
    },
  });

  const mutationLogout = useMutation({
    mutationFn: logoutMutation,
    onSuccess: () => {
      setIsLoggedIn(false);
      setJwtToken("");
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      setUserData(null);
      setLoading(false);
      navigate(ROUTES.LANDING);
    },
    onError: (error) => {
      setErrors({
        logoutErrors: error.response.data.message || "Something went wrong",
      });
      setLoading(false);
    },
  });

  const onSignup = async (data) => {
    await mutationSignup.mutateAsync(data);
  };

  const onLogin = async (data) => {
    await mutationLogin.mutateAsync(data);
  };

  const onLogout = async () => {
    await mutationLogout.mutateAsync(jwtToken);
  };

  useEffect(() => {
    if (
      mutationLogin.isPending ||
      mutationSignup.isPending ||
      mutationLogout.isPending
    ) {
      setLoading(true);
    }
  }, [
    mutationLogin.isPending,
    mutationSignup.isPending,
    mutationLogout.isPending,
  ]);

  const value = {
    isLoggedIn,
    onSignup,
    onLogin,
    onLogout,
    errors,
    jwtToken,
    checkingAuthState,
    loading,
  };
  return (
    <>
      <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    </>
  );
}
