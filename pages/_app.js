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
                        <AuthContextProvider>
                            <DefaultLayout>
                                <Component {...pageProps} />
                            </DefaultLayout>
                        </AuthContextProvider>
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

            <Script 
            strategy="beforeInteractive"
            src="https://cmp.osano.com/Azqe5ATEfK5kJ58/bef3cd5a-ec43-44f1-babd-c06c14570741/osano.js" />

            <Script 
            id="google-adsense"
            async
            crossOrigin="anonymous"
            data-cookiecategory="ads"
            strategy="beforeInteractive"
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3288402026194745"
            onError={(e) => {
                console.error('Google Adsense Script failed to load', e)
            }} />
        </div>
    )
}

export default MyApp
