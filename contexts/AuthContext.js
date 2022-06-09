import {createContext, useContext, useEffect, useState} from "react";
import {toast} from "react-toastify";
import User from "../models/User";
import AppConfig from "../models/AppConfig";

export const AuthContext = createContext({
    isAuthenticating: false,
    isAuthenticated: false,
    isRedirectingToLogin: false,
    checkAuth: () => {},
    setIsRedirectingToLogin: () => {}
});

export function AuthContextProvider(props) {
    const [isAuthenticating, setIsAuthenticating] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isRedirectingToLogin, setIsRedirectingToLogin] = useState(false);

    const context = {
        checkAuth: checkAuth,
        isAuthenticating,
        isAuthenticated,
        isRedirectingToLogin,
        setIsRedirectingToLogin
    };

    function checkAuth() {
        if (!sessionStorage.getItem('authtoken'))
            return;

        setIsAuthenticating(true);

        toast.dark('We are currently trying to restore your session. Please wait!', {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "restoring-session",
        });

        let url = AppConfig.server_url + 'api/webapp/check';

        fetch(url, { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result["id"]) {
                        //store bank balance
                        User.ID = result["id"];
                        User.bank_balance = result["bank_balance"];
                        User.company_data = result["company"];
                        toast.success('You have been logged in successfully!', {
                            position: "bottom-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            toastId: "restoring-session-success",
                        });

                        setIsAuthenticated(true);
                    } else {

                        /*if (result["error"] === "NO_LICENSE_KEY"){
                            User.ID = result["userId"];
                            setRedirectToActivateAccount(true);
                            setIsAuthenticating(false);
                            return;
                        }*/

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
                () => {
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

    useEffect(() => {
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider value={context}>
            {props.children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);