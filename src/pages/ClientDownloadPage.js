import VTCMDesktopClientImage from "../resources/images/screenshots/screenshot-1.png";

const ClientDownloadPage = () => {
    return (
        <div className="page navbar-top-margin">
            <div
                className="vtcm-welcome-banner bg-gradient-to-b from-black to-gray-900 w-full text-white d-flex items-center flex-row text-center h-auto p-10">
                <div className="">
                    <h1 className="text-3xl sm:text-5xl font-bold">Download VTCManager Desktop Client</h1>
                </div>
                <img src={VTCMDesktopClientImage} alt="VTCManager desktop client screenshot"
                     className="h-auto mx-auto my-8 shadow"/>
                <div>
                    <a href="https://cdn.vcc-online.eu/apps/vtcm-installer/VTCManager%20Client%20Setup.exe"
                       className="text-xl sm:text-2xl">Click me to start the download.</a>
                    <h2 className="text-md sm:text-1xl text-gray-400">Requires Windows 10 & <a className="hover:text-white"
                                                                                               href="https://support.microsoft.com/en-us/help/4503548/microsoft-net-framework-4-8-offline-installer-for-windows">.NET
                        Framework 4.8</a></h2>
                </div>
            </div>
        </div>
    );
}
export default ClientDownloadPage;