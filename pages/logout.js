import {useEffect} from "react";

export default function LogoutPage() {;

    useEffect(() => {
        sessionStorage.removeItem("authtoken")
        window.location.href = "/";
    }, []);

    return (
        <div className="h-screen w-100 flex items-center justify-center">
            <div>
                <h1 className="text-3xl">Signing out</h1>
                <p className="text-white text-opacity-75 pt-1 text-center">Please wait...</p>
            </div>
        </div>
    );
}