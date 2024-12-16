import { useContext } from 'react'
import { AuthContext } from '../providers/AuthProvider'
import { Navigate, Link } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className='flex flex-col gap-2 justify-center items-center '>
                <div className="w-10 h-10 border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
            </div>
        )

    }

    if (user) {
        return children
    }

    return (
        <Navigate to="/login" replace />
    )
}

export default PrivateRoute
