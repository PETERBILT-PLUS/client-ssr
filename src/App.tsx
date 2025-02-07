import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Layout from "./Layout/Layout";
import Home from "./Components/Home/Home";
import RegisterAgent from "./Components/Register/RegisterAgent/RegisterAgent";
import "./App.css";
import Payment from './Components/PaymentPage/Payment';
import LoginAgent from './Components/Login/LoginAgent/LoginAgent';
import AgenceDashboadLayout from './Components/AgenceDashboadLayout/AgenceDashboadLayout';
import AdminDashboard from './Components/AgentDashboard/AdminDashboard';
import AgenceAdminProfile from './Components/AgenceAdminProfile/AgenceAdminProfile';
import AgenceAdminVehicules from './Components/AgenceAdminVehicules/AgenceAdminVehicules';
import CheckState from './Components/checkState/CheckState';
import CreateListing from './Components/CreateListing/CreateListing';
import EditVehicule from './Components/EditVehicule/EditVehicule';
import SingleCar from './Components/SingleCar/SingleCar';
import Register from './Components/Register/Register/Register';
import Login from './Components/Login/UserLogin/Login';
import UserReservations from './Components/UserReservations/UserReservations';
import UserProfile from './Components/UserProfile/UserProfile';
import PaymentConfirm from "./Components/Payment/Payment";
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import CheckAgent from './Components/CheckAgent/CheckAgent';
import CheckUser from './Components/CheckUser/CheckUser';
import AgencyNotifications from './Components/AgencyNotifications/AgencyNotifications';
import AgencyReservations from './Components/AgencyReservations/AgencyReservations';
import Apropos from './Components/Apropos/Apropos';
import PolitiqueConfidentialite from './Components/PolitiqueConfidentialite/PolitiqueConfidentialite';
import ConditionsGenerales from './Components/ConditionsGenerales/ConditionsGenerales';
import SuperAdminLayout from './Layout/SuperAdminLayout/SuperAdminLayout';
import SuperAdminUsers from './Components/SuperAdminUsers/SuperAdminUsers';
import SuperAdminUserReservations from './Components/SuperAdminUserReservations/SuperAdminUserReservations';
import SuperAdminAgencys from './Components/SuperAdminAgencys/SuperAdminAgencys';
import SuperAdminDashboard from './Components/SuperAdminDashboard/SuperAdminDashboard';
import SuperAdminReservations from './Components/SuperAdminReservations/SuperAdminReservations';
import Page404 from './Components/Page404/Page404';
import SuperAdminAnalytics from './Components/SuperAdminAnalytics/SuperAdminAnalytics';


function App() {
  const initialOptions = {
    clientId: "AUhXr6owudUIJNmKjtEUvncWpcbnscL5Xrw1oj0ex8PUavA1sQcIc7QES-SJmX0eQkCtCrTvffptTk1I",
    currency: "USD",
    intent: "capture",
  };

  const router = createBrowserRouter(createRoutesFromElements(
    <Route element={<CheckState />}>
      <Route path="*" element={<Page404 />} />

      <Route path="/super-admin" element={<SuperAdminLayout />}>
        <Route index element={<SuperAdminDashboard />}></Route>
        <Route path="utilisateurs" element={<SuperAdminUsers />}></Route>
        <Route path="get-user-reservations/:id" element={<SuperAdminUserReservations />}></Route>
        <Route path="agences" element={<SuperAdminAgencys />}></Route>
        <Route path="reservations" element={<SuperAdminReservations />}></Route>
        <Route path="analytics" element={<SuperAdminAnalytics />}></Route>
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
    <>
      <PayPalScriptProvider options={initialOptions}>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </>
  )
}

export default App;