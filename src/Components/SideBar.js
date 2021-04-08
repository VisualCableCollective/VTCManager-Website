import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import User from '../Models/User';

const SubMenuItem = ({ title, to }) => {
  return (
    <Link to={to} className="block text-left xl:flex xl:items-center shadow xl:shadow-none py-3 px-3 xl:px-4 border-l-4 border-transparent text-white hover:text-blue-dark text-xs">
      {title}
    </Link>
  );
}

/*const SidebarFooter = (props) => {
  return (
    <div className="absolute bottom-0 right-0">
      {props.children}
    </div>
  );
}*/

const MenuItem = ({title, to, icon}) => {

  return (
      <div className="group relative sidebar-item with-children">
        <Link to={to} className="block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 border-transparent hover:bg-black hover:bg-opacity-40 active:bg-opacity-60">
          <div className="h-6 w-6 text-grey-darker xl:mr-2" style={{height: 24}}>
            {icon}
          </div>
          <div className="text-white text-xs">{title}</div>
        </Link>
      </div>
  )
}

const SideBar = (props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    props.visible ? setIsVisible(true) : setIsVisible(false);
  }, [props.visible])

  return (
    <div className={"bg-sidebar min-h-screen fixed pt-10 transition-all duration-700 ease-in-out shadow-2xl " + (isVisible ? "opacity-100" : "opacity-0")} style={{ width: (isVisible ? "15rem" : "0rem") }}>
      <div className="xl:py-2">
        <div className="uppercase font-bold text-grey-darker text-xs px-4 py-2">
          Main
          </div>
        <MenuItem title="Dashboard" to="/dashboard" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>}/>
        <MenuItem title="Logbook" to="/logbook" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="24" className="h-6 w-6 text-grey-darker xl:mr-2"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>}/>
        <div className="group relative sidebar-item with-children">
          <div className="block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 border-blue-dark xl:bg-black bg-black xl:opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="24" className="h-6 w-6 text-grey-darker xl:mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <div className="text-white text-xs">Company</div>
          </div>
        </div>
        <div className=" hidden xl:block pin-t left-full xl:pin-none w-48 xl:w-auto group-hover:block bg-black z-50 xl:z-auto">
          {User.company_data ? null : <SubMenuItem title="Create Company" to="/company/create" />}
          {User.company_data ? <SubMenuItem title="Dashboard" to="/company/dashboard" /> : null}
          {User.company_data ? <SubMenuItem title="Logbook" to="/company/logbook" /> : null}
          {User.company_data && User.isOwnerOfCompany() ? <SubMenuItem title="Applications" to="/company/applications" /> : null}
          {User.company_data ? <SubMenuItem title="Employees" to="/company/employees" /> : null}
          <SubMenuItem title="Companies" to="/companies" />
          {User.company_data && User.isOwnerOfCompany() ? <SubMenuItem title="Settings" to="/company/settings" /> : null}
        </div>
        <div className="group relative sidebar-item with-children">
          <div className="block xl:flex xl:items-center text-center xl:text-left shadow-light xl:shadow-none py-6 xl:py-2 xl:px-4 border-l-4 border-blue-dark xl:bg-black bg-black xl:opacity-75">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" height="24" className="h-6 w-6 text-grey-darker xl:mr-2">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <div className="text-white text-xs">My Account</div>
          </div>
        </div>
        <div className=" hidden xl:block pin-t left-full xl:pin-none w-48 xl:w-auto group-hover:block bg-black z-50 xl:z-auto">
          {/*<SubMenuItem title="Profile" to="/" />
          <SubMenuItem title="Settings" to="/" />*/}
          <SubMenuItem title="Sign Out" to="/logout" />
        </div>
        <MenuItem title="Desktop Client" to="/client/download" icon={<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>}/>
      </div>
      {/*<SidebarFooter>
        <div className="flex justify-end">
          <button className="focus:outline-none hover:text-opacity-70 text-white m-1">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="transform transition-transform duration-500 ease-in-out rotate-180" id="ToggleSidebarImage" height="30" width="30">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.707-10.293a1 1 0 00-1.414-1.414l-3 3a1 1 0 000 1.414l3 3a1 1 0 001.414-1.414L9.414 11H13a1 1 0 100-2H9.414l1.293-1.293z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </SidebarFooter>*/}
    </div>
  )
}
export default SideBar;