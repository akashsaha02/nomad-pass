import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Layout from './components/Layout/Layout.jsx';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register/Register.jsx';
import Login from './pages/Login/Login.jsx';
import AuthProvider from './providers/AuthProvider.jsx';
import PrivateRoute from './routes/PrivateRoute.jsx';
import AddVisa from './pages/AddVisa/AddVisa.jsx';
import AllVisas from './pages/AllVisas/AllVisas.jsx';
import MyAddedVisas from './pages/MyAddedVisas/MyAddedVisas.jsx';
import VisaDetails from './pages/VisaDetails/VisaDetails.jsx';
import MyVisaApplications from './pages/MyVisaApplication/MyVisaApplication.jsx';
import Error from './pages/Error/Error.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: "/all-visas",
        element: <AllVisas />,

      },
      {
        path: "/add-visa",
        element: <PrivateRoute>
          <AddVisa />
        </PrivateRoute>
      },
      {
        path: "/my-added-visas",
        element: <PrivateRoute>
          <MyAddedVisas />
        </PrivateRoute>,
      },
      {
        path: "/visa-details/:id",
        element: <PrivateRoute>
          <VisaDetails />
        </PrivateRoute>,
        loader: ({ params }) => fetch(`http://localhost:5000/visas/${params.id}`)
      },
      {
        path: "/my-visa-applications",
        element: <PrivateRoute>
          <MyVisaApplications />
        </PrivateRoute>
      },
      {
        path: "",
        element: <PrivateRoute>

        </PrivateRoute>
      }

    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
