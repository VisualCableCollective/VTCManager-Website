import {MaintenanceChecker} from "../components/MaintenanceChecker";
import {PageLoaderContextProvider} from "../contexts/PageLoaderContext";
import {Navbar} from "../components/Navbar";
import {useState} from "react";
import {Footer} from "../components/Footer";
import {ToastContainer} from "react-toastify";
import {AuthContextProvider, useAuth} from "../contexts/AuthContext";
import Script from "next/script";

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {SideBar} from "../components/Sidebar";
import {DefaultLayout} from "../layouts/DefaultLayout";
import CookieConsent from "../components/CookieConsent";
import {createTheme, CssBaseline, ThemeProvider} from "@mui/material";
import {CookiesProvider} from "react-cookie";
import {SidebarContextProvider} from "../contexts/SidebarContext";

const theme = createTheme({
    palette: {
        mode: 'dark',
    },
});

function MyApp({ Component, pageProps }) {
    return (
        <div className="App min-h-screen bg-dark-1 text-white">
            <ThemeProvider theme={theme}>
                <PageLoaderContextProvider>
                    <MaintenanceChecker>
                        <CookiesProvider>
                            <AuthContextProvider>
                                <SidebarContextProvider>
                                    <DefaultLayout>
                                        <Component {...pageProps} />
                                    </DefaultLayout>
                                </SidebarContextProvider>
                            </AuthContextProvider>
                        </CookiesProvider>
                    </MaintenanceChecker>
                </PageLoaderContextProvider>
                <CssBaseline />
            </ThemeProvider>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                draggable
                pauseOnHover
                theme="dark"
            />

            <CookieConsent />
        </div>
    )
}

export default MyApp
