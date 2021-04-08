import DiscordLogoWhite from '../Resources/Brandings/Discord/Discord-Logo-White.svg';
//import CalendarIcon from '../Resources/Icons/calendar-white.svg';
import InformationCircleIcon from '../Resources/Icons/information-circle-white.svg';
import ServerIcon from '../Resources/Icons/server-white.svg';
import LoginIcon from '../Resources/Icons/login-white.svg';
import VTCManagerLogo from '../Resources/Brandings/VTCManager/VTCManager-Logo.png';
import {Link} from "react-router-dom";
import React, {useState, useEffect} from 'react';

const Navbar = (props) => {
    const [isUserAuthenticated, setIsUserAuthenticated] = useState(props.isUserAuthenticated);
    const [isUserAuthenticating, setIsUserAuthenticating] = useState(props.isUserAuthenticating);
    const [isUserRedirectingToLogin, setIsUserRedirectingToLogin] = useState(props.isUserRedirectingToLogin);
    const [isUserSigningOut, setIsUserSigningOut] = useState(props.isUserSigningOut);

    let AuthButton = <Link to="/login"
                           className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"><img
        className="mr-1 h-4" src={LoginIcon} alt=""/>Sign In</Link>;
    if (isUserAuthenticated)
        AuthButton = <Link to="/logout"
                           className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"><img
            className="mr-1 h-4" src={LoginIcon} alt=""/>Sign Out</Link>;
    if (isUserAuthenticating){
        AuthButton = <AuthButtonLoading text="Signing In..." />;
    }else if (isUserRedirectingToLogin){
        AuthButton = <AuthButtonLoading text="Redirecting..." />;
    }else if (isUserSigningOut){
        AuthButton = <AuthButtonLoading text="Signing Out..." />;
    }

    useEffect(() => {
        props.isUserAuthenticated !== isUserAuthenticated && setIsUserAuthenticated(props.isUserAuthenticated);
        props.isUserAuthenticating !== isUserAuthenticating && setIsUserAuthenticating(props.isUserAuthenticating);
        props.isUserRedirectingToLogin !== isUserRedirectingToLogin && setIsUserRedirectingToLogin(props.isUserRedirectingToLogin);
        props.isUserSigningOut !== isUserSigningOut && setIsUserSigningOut(props.isUserSigningOut);
    }, [
        props.isUserAuthenticated, isUserAuthenticated,
        props.isUserAuthenticating, isUserAuthenticating,
        props.isUserRedirectingToLogin, isUserRedirectingToLogin,
        props.isUserSigningOut, isUserSigningOut]);

    return (
        <nav className="fixed w-full navbar-home z-10">
            <div className="flex justify-between mx-auto max-w-screen-md py-2 items-center">
                <Link to="/"><img src={VTCManagerLogo} alt="VTCM logo" className="h-7"/></Link>
                <a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="https://vcc-online.eu/redirect/discord"><img className="mr-1 h-4" src={DiscordLogoWhite}
                                                                      alt="Discord Logo"/>Discord</a>
                {/*<a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="/"><img className="mr-1 h-4" src={CalendarIcon} alt=""/>Events</a>*/}
                <a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="https://vcc-online.eu/"><img className="mr-1 h-4" src={InformationCircleIcon}
                                                      alt=""/>Support</a>
                <a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="https://status.vcc-online.eu/"><img className="mr-1 h-4" src={ServerIcon} alt=""/>Server Status</a>
                {AuthButton}
            </div>
        </nav>
    );
}

const AuthButtonLoading = ({text}) => {
    return (
        <div
            className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38 38" className="mr-2 h-4">
                <defs>
                    <linearGradient x1="8.042%" y1="0%" x2="65.682%" y2="23.865%" id="a">
                        <stop stopColor="#fff" stopOpacity={0} offset="0%"/>
                        <stop stopColor="#fff" stopOpacity=".631" offset="63.146%"/>
                        <stop stopColor="#fff" offset="100%"/>
                    </linearGradient>
                </defs>
                <g fill="none" fillRule="evenodd">
                    <g transform="translate(1 1)">
                        <path d="M36 18c0-9.94-8.06-18-18-18" id="Oval-2" stroke="url(#a)" strokeWidth={4}>
                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18"
                                              dur="0.9s" repeatCount="indefinite"/>
                        </path>
                        <circle fill="#fff" cx={36} cy={18} r={1}>
                            <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18"
                                              dur="0.9s" repeatCount="indefinite"/>
                        </circle>
                    </g>
                </g>
            </svg>
            {text}
        </div>
    )
}

export default Navbar;