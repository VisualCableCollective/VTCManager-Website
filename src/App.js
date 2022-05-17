//Pages
import HomePage from './pages/HomePage'
import LogbookPage from './pages/LogbookPage'
import DashboardPage from "./pages/DashboardPage"
import CreateCompanyPage1 from "./pages/company/create/CreateCompanyPage1"
import CompanyDashboardPage from "./pages/company/CompanyDashboardPage"
import CompanyLogbookPage from "./pages/company/CompanyLogbookPage"
import CompaniesSearchPage from "./pages/CompaniesSearchPage"
import CompanyJobApplicationPage from "./pages/company/CompanyJobApplicationPage"
import JobPage from "./pages/JobPage"
import CompanyJobApplicationOverviewPage from "./pages/company/CompanyJobApplicationOverviewPage"
import CompanyEmployeesPage from "./pages/company/CompanyEmployeesPage"
import LoginRedirectPage from "./pages/auth/LoginRedirectPage";
import CompanySettingsPage from "./pages/company/CompanySettingsPage";
import ActivateLicenseKeyPage from "./pages/ActivateLicenseKeyPage";

//Components
import SideBar from './components/SideBar'
import Navbar from "./components/Navbar";

//Actions
import LogoutAction from './actions/LogoutAction'

//Models
import User from './models/User'
import AppConfig from './models/AppConfig'

//CSS
import 'react-toastify/dist/ReactToastify.css'

//React Components
import React, { useState, useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify'
import Footer from "./components/Footer";
import ClientDownloadPage from "./pages/ClientDownloadPage";
import HTTPRequestUtils from "./utils/HTTPRequestUtils";
import MaintenancePage from "./pages/MaintenancePage";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [redirectToActivateAccount, setRedirectToActivateAccount] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)
  const [isRedirectingToLoginPage, setIsRedirectingToLoginPage] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [isInMaintenanceMode, setIsInMaintenanceMode] = useState(false)
  const [showFullPageLoadingSpinner, setShowFullPageLoadingSpinner] = useState(true)
  const isInMaintenanceModeRef = useRef(isInMaintenanceMode);
  isInMaintenanceModeRef.current = isInMaintenanceMode;
  const showFullPageLoadingSpinnerRef = useRef(showFullPageLoadingSpinner);
  showFullPageLoadingSpinnerRef.current = showFullPageLoadingSpinner;

  if (process.env.NODE_ENV === "development" && process.env.REACT_APP_API_SERVER) {
    AppConfig.server_url = process.env.REACT_APP_API_SERVER
  }

  useEffect(() => {
    checkMaintenance();
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function checkAuth() {
    if (!sessionStorage.getItem('authtoken'))
      return
    setIsAuthenticating(true)
    toast.dark('We are currently trying to restore your session. Please wait!', {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId: "restoring-session",
    })
    let url = AppConfig.server_url + 'api/webapp/check'
    fetch(url, { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
      .then(res => res.json())
      .then(
        (result) => {
          if (result["id"]) {
            //store bank balance
            User.ID = result["id"]
            User.bank_balance = result["bank_balance"]
            User.company_data = result["company"]
            toast.success('You have been logged in successfully!', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: "restoring-session-success",
            })
            setIsAuthenticated(true);
          } else {
            
            if (result["error"] == "NO_LICENSE_KEY"){
              User.ID = result["userId"];
              setRedirectToActivateAccount(true);
              setIsAuthenticating(false);
              return;
            }

            toast.error('Sorry, but we couldn\'t log you in. Please click "Sign In" on top of the page to try it again.', {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              toastId: "restoring-session-success",
            })
            sessionStorage.removeItem("authtoken")
          }
          setIsAuthenticating(false)
        },
        (error) => {
          toast.error('Sorry, but we couldn\'t log you in. Please click "Sign In" on top of the page to try it again.', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "restoring-session-success",
          })
          setIsAuthenticating(false)
        }
      )
  }

  function checkMaintenance() {
    setTimeout(checkMaintenance, 10000);
    fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CheckServiceStatus), { headers: new Headers({ 'Accept': 'application/json' }) })
      .then(res => res.json())
      .then(
        (result) => {
          if (!result["WebApp"]["operational"]) {
            if (!isInMaintenanceModeRef.current)
              setIsInMaintenanceMode(true);
          } else {
            if (isInMaintenanceModeRef.current) {
              window.location.reload(); //reload app if app files changed
            }
          }
          if(showFullPageLoadingSpinnerRef.current)
            setShowFullPageLoadingSpinner(false);
        },
        (error) => {
          setIsInMaintenanceMode(true);
          if(showFullPageLoadingSpinnerRef.current)
            setShowFullPageLoadingSpinner(false);
        }
      )
      .catch((reason) => {
        setIsInMaintenanceMode(true);
        if(showFullPageLoadingSpinnerRef.current)
          setShowFullPageLoadingSpinner(false);
      })
  }
  let AppContent;

  if (isInMaintenanceMode){
    AppContent = (<MaintenancePage />);
  }else{
    AppContent = (
      <div className="App min-h-screen bg-dark-1 text-white">
      <Router>
        <Navbar isUserAuthenticated={isAuthenticated} isUserAuthenticating={isAuthenticating} isUserRedirectingToLogin={isRedirectingToLoginPage} isUserSigningOut={isSigningOut} />
        <div className="flex">
          <SideBar visible={isAuthenticated} />
          <div className={"w-full transition-all duration-700 ease-in-out	" + (isAuthenticated && "ml-60")}>

            <Routes>
              <Route path="/account/activate" element={<ActivateLicenseKeyPage />} />
              <Route path="/company/application/:id" element={<CompanyJobApplicationPage />} />
              <Route path="/company/applications/" element={<CompanyJobApplicationOverviewPage />} />
              <Route path="/company/settings" element={<CompanySettingsPage />} />
              <Route path="/company/dashboard" element={<CompanyDashboardPage />} />
              <Route path="/company/employees" element={<CompanyEmployeesPage />} />
              <Route path="/company/logbook" element={<CompanyLogbookPage />} />
              <Route path="/company/create" element={<CreateCompanyPage1 />} />
              <Route path="/login" element={<LoginRedirectPage setIsRedirecting={setIsRedirectingToLoginPage} />} />
              <Route path="/logout" element={<LogoutAction setIsSigningOut={setIsSigningOut} />} />
              <Route path="/logbook" element={<LogbookPage />} />
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/job/:id" element={<JobPage />} />
              <Route path="/companies" element={<CompaniesSearchPage />} />
              <Route path="/client/download" element={<ClientDownloadPage />} />
              <Route path="/" element={<HomePage checkAuthFunction={checkAuth} />} />
            </Routes>
            <Footer />
          </div>
        </div>
        { redirectToActivateAccount ? <Navigate to="/account/activate" /> : ""}
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
      />
    </div>
    );
  }

  return (
    <div className="App min-h-screen bg-dark-1 text-white">
      {/*pointerEvents: "none": user can click through the layer otherwise the user won't be able to use the interface after the loading overlay disappeared. It is not the best solution. ToDo: improve this*/}
      <div className={"fixed bg-dark-1 min-h-screen w-screen z-50 flex items-center justify-center transition-opacity duration-500 ease-in-out " + (!showFullPageLoadingSpinner ? "opacity-0" : "opacity-100")} style={{pointerEvents: "none"}}>
        <div>
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      </div>
      {AppContent}
    </div>
  )
}

export default App
