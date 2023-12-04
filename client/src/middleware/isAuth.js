import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from 'axios';

const isAuth = (WrappedComponent) => {
    const Auth = (props) => {
        const router = useRouter();
        const [user, setUser] = useState(null);

        useEffect(() => {
            const token = localStorage.getItem('token');

            const verifyToken = async () => {
                try {
                    if (token) {
                        const response = await axios.post('http://localhost:3005/auth/verifyToken', { token });
                        if (response.data.valid) {

                            setUser(response.data.user)

                            return;
                        }
                    }
                    router.push('/login');
                } catch (error) {
                    console.error('Token verification error:', error);
                    router.push('/login');
                }
            };

            verifyToken();

        }, []);

        return <WrappedComponent user={user} {...props} />;
    };

    return Auth;
};

export default isAuth;
