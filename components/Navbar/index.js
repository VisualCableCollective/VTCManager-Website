import React, {useState, useEffect} from 'react';
import Link from "next/link";
import Image from "next/image";

import DiscordLogoWhite from '../../public/svg/discord-white.svg';
import InformationCircleIcon from '../../public/svg/information-circle-white.svg';
import ServerIcon from '../../public/svg/server-white.svg';
import LoginIcon from '../../public/svg/login-white.svg';
import VTCManagerLogo from '../../public/img/vtcmanager.png';
import {useAuth} from "../../contexts/AuthContext";

export const Navbar = (props) => {
    const auth = useAuth();

    const [isUserSigningOut, setIsUserSigningOut] = useState(props.isUserSigningOut);

    let AuthButton = (
        <Link href="/login">
            <div className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center">
                <Image className="h-4" src={LoginIcon} alt=""/>
                <p className="ml-1">Sign In</p>
            </div>
        </Link>
    );
    if (auth.isAuthenticated)
        AuthButton = (
            <Link href="/logout">
                <div className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center">
                    <Image className="h-4" src={LoginIcon} alt=""/>
                    <p className="ml-1">Sign Out</p>
                </div>
            </Link>
        );
    if (auth.isAuthenticating){
        AuthButton = <AuthButtonLoading text="Signing In..." />;
    }else if (auth.isRedirectingToLogin){
        AuthButton = <AuthButtonLoading text="Redirecting..." />;
    }else if (isUserSigningOut){
        AuthButton = <AuthButtonLoading text="Signing Out..." />;
    }

    useEffect(() => {
        props.isUserSigningOut !== isUserSigningOut && setIsUserSigningOut(props.isUserSigningOut);
    }, [
        props.isUserSigningOut, isUserSigningOut]);

    return (
        <nav className="fixed w-full navbar-home z-10">
            <div className="flex justify-between mx-auto max-w-screen-md py-2 items-center">
                <Link href="/" passhref>
                    <a className="relative h-7 w-7">
                        <Image src={VTCManagerLogo} alt="VTCM logo" layout={'fill'} objectFit={'contain'}/>
                    </a>
                </Link>

                <a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="https://vcc-online.eu/redirect/discord">
                    <div className="relative mr-1 h-6 w-6">
                        <Image src={DiscordLogoWhite} alt="Discord" layout={'fill'} objectFit={'contain'}/>
                    </div>
                    Discord
                </a>
                {/*<a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="/"><img className="mr-1 h-4" src={CalendarIcon} alt=""/>Events</a>*/}
                <a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="https://vcc-online.eu/">
                    <Image className="h-4" src={InformationCircleIcon} alt="Support"/>
                    <p className="ml-1">Support</p>
                </a>

                <a className="text-gray-300 text-sm hover:text-white transition-colors ease-out duration-200 flex items-center"
                   href="https://status.vcc-online.eu/">
                    <Image className="h-4" src={ServerIcon} alt="Server Status"/>
                    <p className="ml-1">Server Status</p>
                </a>
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