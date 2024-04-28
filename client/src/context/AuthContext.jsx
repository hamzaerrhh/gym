import { createContext, useReducer, useEffect } from "react";
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
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });
  useEffect(() => {
    const getData = async () => {
      const token = Cookies.get("token");
      if (token) {
        try {
          const res = await axios.get("http://localhost:5000/api/auth/data", {
            withCredentials: true,
          });
          dispatch({ type: "LOGIN", payload: res.data.user[0] });
        } catch (err) {
          consoel.log(err);
        }
        console.log(token);
        dispatch({});
      } else {
        dispatch({ type: "LOGOUT" });
      }
    };
    getData();
    // Verify if the user is authenticated
  }, []);
  console.log("auth state:", state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
