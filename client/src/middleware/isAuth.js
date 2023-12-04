import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import axios from 'axios';

const isAuth = (WrappedComponent) => {
    const Auth = (props) => {
        const router = useRouter();

        useEffect(() => {
            const token = localStorage.getItem('token');

            const verifyToken = async () => {
                try {
                    if (token) {
                        const response = await axios.post('http://localhost:3005/auth/verifyToken', { token });
                        if (response.data.valid) {
                            return;
                        }
                    }
                    router.push('/login');
                } catch (error) {
                    console.error('Token verification error:', error);
                    router.push('/login');
                }
            };

        }, []);

        return <WrappedComponent {...props} />;
    };

    return Auth;
};

export default isAuth;
