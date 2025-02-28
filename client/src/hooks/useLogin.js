import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../context/AuthContext.jsx";

const useLogin = () =>{

    const { login } = useAuth();
    const [error, setError] = useState(null);
    const [loading, setLoading] =  useState(null);

    const loginUser = async (values) => {
        try {
            setError(null);
            setLoading(true);
            const res = await fetch ("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });

            const data = await res.json();

            if (res.status === 200) {
                message.success("Logged in successfully");
                login(data.token, data.user);
            } else if (res.status === 404) {
                setError (data.message);
            } else {
                message.error ("Incorrect email or password");
            }
        } catch (error) {
            message.error("sign in Failed");
        } finally {
            setLoading(false);
        }
    };

    return { loading, error, loginUser};
};

export default useLogin;