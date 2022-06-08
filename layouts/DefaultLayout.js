import {Navbar} from "../components/Navbar";
import {SideBar} from "../components/Sidebar";
import {Footer} from "../components/Footer";
import {useAuth} from "../contexts/AuthContext";
import {useState} from "react";

export function DefaultLayout({children}) {
    const auth = useAuth();

    const [isSigningOut, setIsSigningOut] = useState(false);

    return (
        <>
            <Navbar isUserSigningOut={isSigningOut} />

            <div className="flex">
                <SideBar />

                <div className={"min-w-full transition-all duration-700 ease-in-out " + (auth.isAuthenticated && "pl-60")}>
                    {children}

                    <Footer />
                </div>
            </div>
        </>
    )
}