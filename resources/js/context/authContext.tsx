import API from "@/server/API";
import { UserProps } from "@/types";
import { createContext, useContext, useEffect, useState } from "react"

interface authContextProps {
  isLogin: boolean;
  loading: boolean;
}

const authContext = createContext<authContextProps | null>(null);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLogin, setIsLogin] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const response = await API.get("/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setUser(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchMe();
  }, [token]);
}

