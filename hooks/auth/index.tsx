import { useAuth } from "@/context/useAuth";
import axios from "axios";
import toast from "react-hot-toast";

const useAuthHandler = () => {
    const { setAuth } = useAuth();

    const handleLogin = async (email: string, password: string) => {
        try {
            const res = await axios.post("/api/Auth/Login", {
                email,
                password,
            });

            if (res.status === 200) {
                toast.success("Login successful");
                setAuth({
                    AuthState: false,
                    AuthType: "log",
                    isAuthenticated: true,
                });
            } else {
                toast.error("Login failed");
            }
        } catch {
            toast.error("Login failed");
        }
    };

    return {
        handleLogin
    }
}

export default useAuthHandler;