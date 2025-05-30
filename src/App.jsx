import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Login from "./pages/Login";
import Forgotpassword from "./pages/Forgotpassword";
import ResetPassword from "./pages/ResetPassword";
import MainLayout from "./components/MainLayout";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";
import CustomerDetails from "./pages/ManageCustomer/CustomerDetails";
import ManageCustomer from "./pages/ManageCustomer/ManageCustomer";
// import PageNotFound from "./pages/PageNotFound";
import ManageRestaurants from "./pages/ManageRestaurants/ManageRestaurants";
import ManageOrders from "./pages/ManageOrder/ManageOrders";
import RestaurantDashboard from "./pages/Dashboard/RestaurantDashboard";
import RestaurantLayout from "./components/RestaurantLayout";
import Payments from "./pages/Payments/Payments";
import Reports from "./pages/report/Reports";
import Analytics from "./pages/Analytics/Analytics";
import Notifications from "./pages/Notification/Notifications";
import ComplaintsContact from "./pages/Complaints/ComplaintsContact";
import TearmandCondition from "./pages/TearmAndConditions/TearmandCondition";
import UpdateContactDetails from "./pages/UpdateContactDetails/UpdateContactDetails";
import AdminAccess from "./pages/AdminAccess/AdminAccess";
import Settings from "./pages/Setting/Settings";
import RestaurantOrders from "./pages/RestaurantOrders/RestaurantOrders";
import RestaurantMenu from "./pages/RestaurantMenu/RestaurantMenu";
import Earnings from "./pages/RestaurantEarnings/Earnings";
import Transactions from "./pages/RestaurantTransactions/Transactions";
import Reviews from "./pages/RestaurantReviews/Reviews";
import Offers from "./pages/RestaurantOffers/Offers";
import RestaurantProfile from "./pages/RestaurantProfile/RestaurantProfile";
// import Notifications from "./pages/Notification/Notifications";
import RestaurantNotifications from "./pages/RestaurantNotifications.js/RestaurantNotifications";
import OtpVerification from "./pages/OtpVerification";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/forgot-password" element={<Forgotpassword />} />
        <Route path="/otp-verify" element={<OtpVerification />} />

        {/* Admin Routes */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="manage-customers" element={<ManageCustomer />} />
          <Route path="manage-restaurants" element={<ManageRestaurants />} />
          <Route path="manage-orders" element={<ManageOrders />} />
          <Route
            path="manage-customer/customer-detail"
            element={<CustomerDetails />}
          />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="complaints" element={<ComplaintsContact />} />
          <Route path="terms" element={<TearmandCondition />} />
          <Route path="contact-details" element={<UpdateContactDetails />} />
          <Route path="admin-access" element={<AdminAccess />} />
          <Route path="settings" element={<Settings />} />
          <Route path="privacy" element={<PrivacyPolicy />} />
          {/* <Route path="my-profile" element={<MyProfile />} /> */}
          {/* <Route path="change-password" element={<ChangePassword />} /> */}
          {/* <Route path="*" element={<PageNotFound />} /> */}
        </Route>
        {/* Restaurant Routes */}
        <Route path="/restaurant" element={<RestaurantLayout />}>
          <Route index element={<RestaurantDashboard />} />
          <Route path="orders" element={<RestaurantOrders />} />
          <Route path="menu" element={<RestaurantMenu />} />
          <Route path="earnings" element={<Earnings />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="reviews" element={<Reviews />} />
          <Route path="offers" element={<Offers />} />
          <Route path="notifications" element={<RestaurantNotifications />} />
          <Route path="profile" element={<RestaurantProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
