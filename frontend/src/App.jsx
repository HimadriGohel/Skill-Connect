import { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createBrowserRouter, Outlet, RouterProvider, useLocation } from "react-router-dom";
import Navbar from '../components/HomeNavbar/Navbar.jsx';
import OtherPageNavbar from '../components/otherPageNavbar/otherPageNavbar.jsx';
import WorkerProfileNavbar from "../components/workerProfilePageNav/workerProfilePageNavbar.jsx";
import UserPageNav from '../components/userPageNav/userPageNav.jsx';
import Footer from '../components/Footer/Footer.jsx';
import SignIn from '../components/customerLogin/customerLogin.jsx';
import ContactUs from '../components/ContactUs/ContactUs.jsx'
import Support from '../src/Support/Support';
import Admin from '../src/Admin/Admin';
import AdminHeader from '../components/adminHeader/adminHeader.jsx';
import AdminNavbar from '../components/adminNavbar/adminNavbar.jsx';
import AdminContainer from '../components/adminContainer/adminContainer.jsx';
import WorkerProfile from '../src/WorkerProfile-Login/WorkerProfileLogin.jsx';
import Home from '../src/Home/Home';
import WorkerProfilePage from "../src/Worker-Profile/Worker-Profile.jsx";
import UserProfile from "../src/UserProfile/UserProfile.jsx"
import FindWorker from '../src/FindWorker/FindWorker.jsx';
import TopBanner from '../components/TopBanner/TopBanner.jsx';
import WorkerProfile02 from '../src/02WorkerProfile/WorkerProfile02.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "../dist/css/adminlte.min.css";
import './global.css';


import { RegistrationForm } from "../components/RegistrationForm/RegistrationForm";
const role = localStorage.getItem("role");
function App() {
  const registrationFormRef = useRef(null);

  // Layout Component to Conditionally Render Navbars
  const Layout = () => {
    const location = useLocation();
    
    // Determine which navbar to show based on the current path
    const isHomePage = location.pathname === '/';
    const isWorkerProfile = location.pathname === '/worker-profile';
    const isUserProfile = location.pathname === '/userprofile';
   const isAdminPage = location.pathname === '/admin';
   
   if (isAdminPage) {
    return <Outlet />;
  }
    return (
      <>
        {isHomePage && <TopBanner />}
        {isHomePage ? (
          <Navbar registrationFormRef={registrationFormRef} />
        ) : isWorkerProfile ? (
          <WorkerProfileNavbar />
        ) : isUserProfile ? (
          <UserPageNav />
        ) :
          (
            <OtherPageNavbar />
          )} 

        <Outlet />
        <Footer />
      </>
    );
  };

  // Router Configuration
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home registrationFormRef={registrationFormRef} />,
        },
        {
          path: "/worker-register",
          element: <RegistrationForm />
        },
        {
          path: "/support",
          element: <Support />,
        },
        {
           path: "/ContactUs",
           element: <ContactUs />
        },
        {          
        path:"/admin" ,
        element:<Admin />
        }, 
        {
         path: "/adminHeader",
         element:<AdminHeader />
        },
        {
         path: "/adminNavbar",
         element:<AdminNavbar />
        },
        {
          path: "/adminContainer",
          element: <AdminContainer />
        },
        {
          path: "/worker-profile",
          element: <WorkerProfilePage />, // Worker Profile Page
        },
        {
          path: "/userprofile",
          element: <UserProfile />, // User Profile Page
        },
        {
          path: "/workerprofile",
          element: <WorkerProfile />, // Worker Login Page
        },
        {
          path: "/findworker",
          element: <FindWorker />,
        },
        {
          path: "/signin",
          element: <SignIn />,
        },
        {
          path: "/worker-profile02/:id",
          element: <WorkerProfile02 />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;