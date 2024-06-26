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
      console.log("start geting", token);
      if (token) {
        try {
          const res = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/api/auth/data`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              withCredentials: true,
            }
          );
          console.log("fenish geting");
          dispatch({ type: "LOGIN", payload: res.data.user });
          console.log(res);
        } catch (err) {
          console.log(err);
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
