import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useNavigate } from "react-router-dom";

interface User {
  username: string;
  email?: string;
  fullName?: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("devtrack-token");
    if (token) {
      fetchUserFromBackend(token);
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserFromBackend = async (token: string) => {
    try {
      const res = await fetch(`${API_BASE}/user/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to load user data");

      const data = await res.json();
      setUser(data);
      localStorage.setItem("devtrack-user", JSON.stringify(data));
    } catch (err) {
      console.error("Error loading user:", err);
      setUser(null);
      localStorage.removeItem("devtrack-user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (username: string, password: string) => {
    if (!username || !password) {
      alert("Please enter your username and password.");
      return;
    }

    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Invalid username or password.");
      }

      localStorage.setItem("devtrack-token", data.token);
      await fetchUserFromBackend(data.token);

      navigate("/"); 
    } catch (err: any) {
      alert(err.message || "Login failed. Please try again later.");
    }
  };

  const logout = () => {
    localStorage.removeItem("devtrack-user");
    localStorage.removeItem("devtrack-token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}