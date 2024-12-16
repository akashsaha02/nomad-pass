import { useState, useRef, useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { FaGoogle } from "react-icons/fa";
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';


const Login = () => {
    const { user, loginUser, googleSignIn, logoutUser } = useContext(AuthContext);
    const [formData, setFormData] = useState({ email: '', password: '' });
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await loginUser(formData.email, formData.password);
            setFormData({ email: '', password: '' }); // Reset form data
            emailRef.current.value = '';
            passwordRef.current.value = '';
            toast.success('Logged in successfully!');
        } catch (error) {
            toast.error('Error logging in!');
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn();
            navigate('/');
            toast.success('Logged in successfully with Google!');
        } catch (error) {
            toast.error('Error logging in with Google!');
        }
    }

    const handleLogout = async () => {
        try {
            await logoutUser();
            toast.success('Logged out successfully!');
            navigate('/');

        } catch (error) {
            toast.error('Error logging out!');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen my-6">
            <Helmet>
                <title>WinterSoul | Login</title>
            </Helmet>
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
                {user ? (
                    <div className="">
                        <div className="p-4 text-center text-green-600 bg-green-100 rounded-md flex flex-col justify-center items-center gap-2">
                            <img src={user.photoURL} alt="Avatar" className="w-20 h-20 object-cover rounded-full border-2 border-red-500" />
                            <p className="">Logged in successfully! {user.displayName || user.email}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            type="submit"
                            className="w-full px-4 py-2 mt-3 md:mt-5 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Log out
                        </button>
                    </div>
                ) :

                    (

                        <div className="">
                            <h2 className="text-2xl font-bold text-center text-gray-700">Login to Your Account</h2>
                            <hr className='my-4'></hr>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-600">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        ref={emailRef}
                                        value={formData.email}
                                        onChange={handleChange}
                                        autoComplete="email"
                                        required
                                        placeholder="Enter your email"
                                        className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        ref={passwordRef}
                                        value={formData.password}
                                        onChange={handleChange}
                                        autoComplete="current-password"
                                        required
                                        placeholder="Enter your password"
                                        className="w-full px-4 py-2 mt-1 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => handleGoogleSignIn()}
                                    className="w-full flex justify-center items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                >
                                    <FaGoogle />
                                    <p className="">Login with Google</p>
                                </button>

                                <hr className="my-4 border-gray-300" />
                                <p className="text-sm text-center text-gray-600">
                                    Forgot your password?{' '}
                                    <span
                                        onClick={() =>
                                            navigate('/reset-password', { state: { email: formData.email } })
                                        }
                                        className="text-blue-500 hover:underline cursor-pointer"
                                    >
                                        Reset it here
                                    </span>
                                </p>


                                <p className="text-sm text-center text-gray-600">
                                    Don&apos;t have an account?{' '}
                                    <span onClick={() => navigate("/register")} href="/register" className="text-blue-500 hover:underline">
                                        Register here
                                    </span>
                                </p>
                            </form>
                        </div>)}

            </div>
        </div>
    );
};

export default Login;