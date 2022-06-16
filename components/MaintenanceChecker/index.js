import {useEffect, useRef, useState} from "react";
import {HTTPRequestUtils} from "../../utils/HTTPRequestUtils";
import {usePageLoader} from "../../contexts/PageLoaderContext";

export function MaintenanceChecker({children}) {
    const [isInMaintenanceMode, setIsInMaintenanceMode] = useState(false);
    const maintenanceRef = useRef(false);

    useEffect(() => {
        maintenanceRef.current = isInMaintenanceMode;
    }, [isInMaintenanceMode])

    const pageLoader = usePageLoader();

    function checkMaintenance() {
        setTimeout(checkMaintenance, 10000);

        let url = HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CheckServiceStatus);
        let options = { headers: new Headers({ 'Accept': 'application/json' }) };

        fetch(url, options)
            .then(res => res.json())
            .then(
                (result) => {
                    if (!result["WebApp"]["operational"]) {
                        if (!maintenanceRef.current){
                            console.log("set mode")
                            setIsInMaintenanceMode(true);
                        }
                    } else {
                        if (maintenanceRef.current) {
                            console.log("Reloading app")
                            window.location.reload(); //reload app if app files changed
                        }
                    }
                    pageLoader.setIsLoading(false);
                },
                (error) => {
                    setIsInMaintenanceMode(true);
                    pageLoader.setIsLoading(false);
                }
            )
            .catch(() => {
                setIsInMaintenanceMode(true);
                pageLoader.setIsLoading(false);
            })
    }

    useEffect(() => {
        checkMaintenance();
    }, [])

    if (isInMaintenanceMode) {
        return (
            <div className="min-h-screen bg-red-700 text-white w-100 flex items-center justify-center">
                <div>
                    <div className="flex items-center justify-center mb-3">
                        <div className="bg-white rounded-full flex items-center justify-center">
                            <svg className="m-1" xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 20 20" height="50px" viewBox="0 0 20 20" fill="black"><g><rect fill="none" height="20" width="20" x="0"/></g><g><g><rect height="5.5" transform="matrix(0.7071 -0.7071 0.7071 0.7071 -5.3383 13.8538)" width="2" x="13.05" y="10.62"/><path d="M14.23,8.98c1.38,0,2.5-1.12,2.5-2.5c0-0.51-0.15-0.98-0.42-1.38l-2.08,2.08l-0.71-0.71l2.08-2.08 c-0.4-0.26-0.87-0.42-1.38-0.42c-1.38,0-2.5,1.12-2.5,2.5c0,0.32,0.07,0.63,0.18,0.91L10.69,8.6L9.64,7.54l0.71-0.71L8.93,5.42 L10.34,4C9.56,3.22,8.29,3.22,7.51,4L4.69,6.83l1.06,1.06l-2.13,0L3.27,8.24l2.83,2.83l0.35-0.35L6.46,8.6l1.06,1.06l0.71-0.71 l1.06,1.06l-4.6,4.6l1.41,1.41l7.22-7.22C13.6,8.91,13.91,8.98,14.23,8.98z"/></g></g></svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold text-center">We&apos;ll be back soon!</h1>
                    <p className="text-white text-opacity-75 pt-1 text-center">We are currently down for maintenance to improve your experience.</p>
                    <p className="text-white text-opacity-75 pt-1 text-center">Check the current maintenance status at <a className="hover:underline text-white text-opacity-70 hover:text-opacity-100" target="_blank" rel="noreferrer" href="https://status.vcc-online.eu/">https://status.vcc-online.eu/</a>.</p>
                </div>
            </div>
        )
    }

    return children;
}