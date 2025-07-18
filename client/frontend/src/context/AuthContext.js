import { createContext, useContext, useState, useEffect } from 'react';
import { getUserProfile } from '../services/userService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        const token = localStorage.getItem("token");
        return !!token;
    });

    const [loading, setLoading] = useState(true);

    const login = (userData) => {
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        setIsAuthenticated(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
        setIsAuthenticated(false);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setLoading(false);
            return;
        }

        const restoreSession = async () => {
            try {
                const userData = await getUserProfile();
                setUser(userData);
                setIsAuthenticated(true);
            } catch (err) {
                console.error("⚠️ Failed to restore session:", err.message);
                logout();
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {loading ? <div className="text-center mt-10">Loading...</div> : children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => useContext(AuthContext);
