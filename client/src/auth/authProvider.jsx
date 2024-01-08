import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import cookie from "js-cookie";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const userAPI = "http://localhost:3000/auth";

    const [user, setUser] = useState({username: "", permissions: [], role: ""});
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        async function checkLogin() {
            if(location.pathname === "/create"){
                setLoading(false)
            }else{
                if (user && user.username === "") {
                    const userData = await checkToken();
                    if (userData) {
                        setUser(userData);
                    } else {
                        navigate('/login', { state: { path: location.pathname } });
                    }
                }
                setLoading(false); 
            }
        }
        checkLogin();
    }, []);

    const login = async (loginData) => {
        const {data} = await axios.post(userAPI, loginData);
        try {
            setUser({ username: data.username, permissions: [data.role, ...data.permissions] });
            cookie.set("token", data.token);
            navigate("/");
        } catch (err) {
            return data;
        }
    };

    const logout = () => {
        setUser({ username: "", permissions: [] });
        cookie.remove("token");
        navigate('/login', { state: { path: location.pathname } });
    };

    const checkToken = async () => {
        const token = cookie.get("token");
        try {
            const { data } = await axios.get(`${userAPI}/check/${token}`);
            return { username: data.username, permissions: [data.role, ...data.permissions] };
        } catch (err) {
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, checkToken, login, logout, loading }}>
            {loading ? <div>Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};
