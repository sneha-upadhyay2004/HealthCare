
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

 export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      axios
        .get("https://healthcare-backened.onrender.com/api/v1/users/me", {
          headers: { "x-auth-token": token },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => logout());
    }
  }, [token]);

  const register = async (formData) => {
    const res = await axios.post("https://healthcare-backened.onrender.com/api/v1/users/register", formData);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const login = async (formData) => {
    const res = await axios.post("https://healthcare-backened.onrender.com/api/v1/users/login", formData);
    localStorage.setItem("token", res.data.token);
    setToken(res.data.token);
    setUser(res.data.user);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };




const getUserHistory = async () => {
    try {
        let request = await axios.get("https://healthcare-backened.onrender.com/api/v1/users/get_all_activity", {
            params: {
                token: localStorage.getItem("token")
            }
        });
        return request.data
    } catch
     (err) {
        throw err;
    }
}

const addToUserHistory = async (meetingCode) => {
    try {
        let request = await axios.post("https://healthcare-backened.onrender.com/api/v1/users/add_to_activity", {
            token: localStorage.getItem("token"),
            meeting_code: meetingCode
        });
        return request
    } catch (e) {
        throw e;
    }
}

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout ,getUserHistory,addToUserHistory}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

