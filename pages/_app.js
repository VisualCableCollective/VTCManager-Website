import {MaintenanceChecker} from "../components/MaintenanceChecker";
import {PageLoaderContextProvider} from "../contexts/PageLoaderContext";
import {Navbar} from "../components/Navbar";
import {useState} from "react";
import {Footer} from "../components/Footer";
import {ToastContainer} from "react-toastify";
import {AuthContextProvider, useAuth} from "../contexts/AuthContext";

import '../styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';
import {SideBar} from "../components/Sidebar";
import {DefaultLayout} from "../layouts/DefaultLayout";

function MyApp({ Component, pageProps }) {
    return (
        <div className="App min-h-screen bg-dark-1 text-white">
            <PageLoaderContextProvider>
                <MaintenanceChecker>
                    <AuthContextProvider>
                        <DefaultLayout>
                            <Component {...pageProps} />
                        </DefaultLayout>
                    </AuthContextProvider>
                </MaintenanceChecker>
            </PageLoaderContextProvider>
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
        </div>
    )
}

export default MyApp
