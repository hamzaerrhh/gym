import React, {
  createContext,
  useReducer,
  useEffect,
  useMemo,
  useCallback,
} from "react";
import Cookies from "js-cookie";

import axios from "axios";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { user: null });

  const getData = useCallback(async () => {
    const token = Cookies.get("token");
    if (token) {
      try {
        const res = await axios.get("http://localhost:5000/api/auth/data", {
          withCredentials: true,
        });
        dispatch({ type: "LOGIN", payload: res.data.user });
      } catch (err) {
        console.error(err);
      }
    } else {
      dispatch({ type: "LOGOUT" });
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  const contextValue = useMemo(() => ({ ...state, dispatch }), [state]);

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
