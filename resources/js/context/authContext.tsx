import API from "@/server/API";
import { UserProps } from "@/types";
import { createContext, useContext, useEffect, useState } from "react"

interface authContextProps {
  user: UserProps | null;
  loading: boolean;
}

const AuthContext = createContext<authContextProps | null>(null);
export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        if (!token) return setUser(null);

        const response = await API.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.data);
      } catch (error) {
        if (error) {
          setUser(null);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}