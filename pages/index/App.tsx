import { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { RouterProvider, createMemoryRouter, createRoutesFromElements, Route } from 'react-router-dom';
import store, { persistor } from "../../Configuration/store";
import SocketContextProvider from '../../Context/SocketContext';
import Layout from "../../Layout/Layout";
import Home from "../../Components/Home/Home";
import RegisterAgent from "../../Components/Register/RegisterAgent/RegisterAgent";
import Payment from '../../Components/PaymentPage/Payment';
import LoginAgent from '../../Components/Login/LoginAgent/LoginAgent';
import AdminDashboard from '../../Components/AgentDashboard/AdminDashboard';
import AgenceAdminProfile from '../../Components/AgenceAdminProfile/AgenceAdminProfile';
import AgenceAdminVehicules from '../../Components/AgenceAdminVehicules/AgenceAdminVehicules';
import CreateListing from '../../Components/CreateListing/CreateListing';
import EditVehicule from '../../Components/EditVehicule/EditVehicule';
import SingleCar from '../../Components/SingleCar/SingleCar';
import Register from '../../Components/Register/Register/Register';
import Login from '../../Components/Login/UserLogin/Login';
import UserReservations from '../../Components/UserReservations/UserReservations';
import UserProfile from '../../Components/UserProfile/UserProfile';
import PaymentConfirm from "../../Components/Payment/Payment";
import CheckAgent from '../../Components/CheckAgent/CheckAgent';
import CheckUser from '../../Components/CheckUser/CheckUser';
import AgencyNotifications from '../../Components/AgencyNotifications/AgencyNotifications';
import AgencyReservations from '../../Components/AgencyReservations/AgencyReservations';
import Apropos from '../../Components/Apropos/Apropos';
import PolitiqueConfidentialite from '../../Components/PolitiqueConfidentialite/PolitiqueConfidentialite';
import ConditionsGenerales from '../../Components/ConditionsGenerales/ConditionsGenerales';
import SuperAdminLayout from '../../Layout/SuperAdminLayout/SuperAdminLayout';
import SuperAdminUsers from '../../Components/SuperAdminUsers/SuperAdminUsers';
import SuperAdminUserReservations from '../../Components/SuperAdminUserReservations/SuperAdminUserReservations';
import SuperAdminAgencys from '../../Components/SuperAdminAgencys/SuperAdminAgencys';
import SuperAdminDashboard from '../../Components/SuperAdminDashboard/SuperAdminDashboard';
import SuperAdminReservations from '../../Components/SuperAdminReservations/SuperAdminReservations';
import Page404 from '../../Components/Page404/Page404';
import "./App.css";
import { ToastContainer } from 'react-toastify';
import AgenceDashboadLayout from '../../Components/AgenceDashboadLayout/AgenceDashboadLayout';
import CheckState from '../../Components/checkState/CheckState';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';

function App() {
  const [isDocumentLoaded, setIsDocumentLoaded] = useState(false);

  const initialOptions = {
    clientId: "AUhXr6owudUIJNmKjtEUvncWpcbnscL5Xrw1oj0ex8PUavA1sQcIc7QES-SJmX0eQkCtCrTvffptTk1I",
    currency: "USD",
    intent: "capture",
  };

  useEffect(() => {
    // Wait for the document to be fully loaded
    const handleLoad = () => {
      setIsDocumentLoaded(true);
    };

    // Listen for document ready
    if (document.readyState === "complete") {
      setIsDocumentLoaded(true);
    } else {
      window.addEventListener("load", handleLoad);
    }

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  const router = createMemoryRouter(createRoutesFromElements(
    <Route element={<CheckState />}>
      <Route path="*" element={<Page404 />} />

      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />}></Route>
        <Route path="utilisateurs" element={<SuperAdminUsers />}></Route>
        <Route path="get-user-reservations/:id" element={<SuperAdminUserReservations />}></Route>
        <Route path="agences" element={<SuperAdminAgencys />}></Route>
        <Route path="reservations" element={<SuperAdminReservations />}></Route>
      </Route>

      {/* For the Agency Admin Routes*/}
      <Route path="/agence-dashboard" element={<AgenceDashboadLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="profile" element={<AgenceAdminProfile />}></Route>
        <Route path="vehicules" element={<AgenceAdminVehicules />}></Route>
        <Route path="create-listing" element={<CreateListing />}></Route>
        <Route path="edit-vehicule/:id" element={<EditVehicule />}></Route>
        <Route path="notifications" element={<AgencyNotifications />}></Route>
        <Route path="reservations" element={<AgencyReservations />}></Route>
      </Route>

      {/* For the user routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />}></Route>
        <Route path="register-agent" element={<RegisterAgent />}></Route>
        <Route path="login-agent" element={<LoginAgent />}></Route>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
        <Route path="a-propos" element={<Apropos />}></Route>
        <Route path="politique-confidentialite" element={<PolitiqueConfidentialite />}></Route>
        <Route path="conditions-generales" element={<ConditionsGenerales />}></Route>

        <Route element={<CheckUser />}>
          <Route path="mes-reservations" element={<UserReservations />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="cars/:id" element={<SingleCar />}></Route>
        </Route>

        <Route element={<CheckAgent />}>
          <Route path="payment" element={<Payment />}></Route>
          <Route path="confirm-payment" element={<PaymentConfirm />}></Route>
        </Route>
      </Route>
    </Route>
  ));

  return (
    <Provider store={store}>
      <PayPalScriptProvider options={initialOptions}>
      {isDocumentLoaded ? (
        <PersistGate loading={null} persistor={persistor}>
          <SocketContextProvider>
            <ToastContainer />
            <RouterProvider router={router} />
          </SocketContextProvider>
        </PersistGate>
      ) : (
        <SocketContextProvider>
          <ToastContainer />
          <RouterProvider router={router} />
        </SocketContextProvider>
      )}
      </PayPalScriptProvider>
    </Provider>
  );
}

export default App;
