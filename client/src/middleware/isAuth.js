  import { useRouter } from "next/navigation";
  import { useEffect, useState } from "react";
  import axios from "axios";
  
  const isAuth = (WrappedComponent) => {
    const Auth = (props) => {
      const router = useRouter();
      const [user, setUser] = useState(null);
  
      useEffect(() => {
        const token = localStorage.getItem("token");
  
        const verifyToken = async () => {
          try {
            if (token) {
              const response = await axios.post(
                "http://localhost:3005/auth/verifyToken",
                { token }
              );
              if (response.data.valid) {
                setUser(response.data.user);
  
                return;
              }
            }
            router.push("/login");
          } catch (error) {
            if (error.status != 200) {
              const refreshToken = localStorage.getItem("refreshToken");
              const refreshResponse = await axios.post(
                "http://localhost:3005/auth/refreshToken",
                { refreshToken }
              );
              if (refreshResponse.data.valid) {
                localStorage.setItem("token", refreshResponse.data.accessToken);
  
                setUser(refreshResponse.data.user);
  
                return;
              } else {
                console.error(
                  "Token verification error:",
                  refreshResponse.data.message
                );
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");
                router.push("/login");
              }
            } else {
              console.error(
                "Token verification error:",
                refreshResponse.data.message
              );
              localStorage.removeItem("token");
              router.push("/login");
            }
          }
        };
  
        verifyToken();
      }, []);
  
      return <WrappedComponent user={user} {...props} />;
    };
  
    return Auth;
  };
  
  export default isAuth;
