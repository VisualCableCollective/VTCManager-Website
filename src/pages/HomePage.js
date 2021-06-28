import VTCMDesktopClientImage from "../resources/images/screenshots/screenshot-1.png";
import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from "react-router-dom";

library.add(fas)

const HomePage = ({checkAuthFunction}) => {
    let query = new URLSearchParams(useLocation().search);
    useEffect(() => {
        let tokenRequestParameter = query.get("token"); 
        if(tokenRequestParameter){
            sessionStorage.setItem('authtoken', tokenRequestParameter);
            checkAuthFunction();
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    return (
        <div className="page navbar-top-margin">
            <div
                className="vtcm-welcome-banner bg-gradient-to-b from-black to-gray-900 w-full text-white d-flex items-center flex-row text-center h-auto p-10">
                <div className="">
                    <h1 className="text-3xl sm:text-5xl font-bold">VTCManager</h1>
                    <h2 className="text-md sm:text-2xl">The future starts now.</h2>
                </div>
                <img src={VTCMDesktopClientImage} alt="VTCM client screenshot"
                    className="h-auto mx-auto my-8 shadow-xl" />
                <div>
                    <h1 className="text-xl sm:text-2xl">VTCManager Desktop Client Public Beta</h1>
                    <h2 className="text-md sm:text-1xl text-gray-400">Available Now</h2>
                </div>
            </div>
            <div className="bg-black w-full">
                <div className="md:max-w-4xl mx-auto py-12 lg:px-0 px-8">
                    <h1 className="text-5xl font-bold text-center pb-14">Does more than just work.</h1>
                    <div className="grid gap-20 sm:grid-cols-3">
                        <div>
                            <FontAwesomeIcon icon="wifi" className="animate-pulse feature-icon-color"
                                size="3x" />
                            <h1 className="text-xl font-bold mt-4">Lightning fast connection</h1>
                            <p className="text-white text-opacity-70 mt-2">Brand new connection technologies
                            enable a faster exchange of data sets and clear the way for unique,
                                        revolutionary functions.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon="pencil-ruler" className="feature-icon-color" size="3x" />
                            <h1 className="text-xl font-bold mt-4">The most modern job tracker ever</h1>
                            <p className="text-white text-opacity-70 mt-2">Due to extensive design research and
                            feedback from the community, we have the most cutting-edge interface you have
                            ever seen. And even if you don't find it so blatant, you can redesign it
                                        yourself until you like it.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon="download" className="feature-icon-color" size="3x" />
                            <h1 className="text-xl font-bold mt-4">The very first tracker with mod support</h1>
                            <p className="text-white text-opacity-70 mt-2">VTCManager comes with a built-in mod
                            store where you can install mods for the tracker as well as for the Euro Truck
                                        Simulator 2 and the American Truck Simulator.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon="microchip" className="feature-icon-color" size="3x" />
                            <h1 className="text-xl font-bold mt-4">Compatible with external hardware</h1>
                            <p className="text-white text-opacity-70 mt-2">With a unique programming interface,
                            we make it possible to build your own truck cockpit. We support everything from
                                        electronic components to external dashboards and multimedia systems.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon="desktop" className="feature-icon-color" size="3x" />
                            <h1 className="text-xl font-bold mt-4">Compatible with external software</h1>
                            <p className="text-white text-opacity-70 mt-2">Our system is compatible with
                            external software such as Discord and Spotify. This enables further functions
                                        from third parties and our tracker to be activated and enjoyed.</p>
                        </div>
                        <div>
                            <FontAwesomeIcon icon="truck" className="feature-icon-color" size="3x" />
                            <h1 className="text-xl font-bold mt-4">One place for you and your company</h1>
                            <p className="text-white text-opacity-70 mt-2">VTCManager contains many functions
                                        for the administration, automation and expansion of your virtual company.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default HomePage;