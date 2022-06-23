import {useEffect} from "react";
import {useAuth} from "../contexts/AuthContext";
import {useRouter} from "next/router";

export default function LogoutPage() {;
    const auth = useAuth();
    const router = useRouter();

    useEffect(() => {
        auth.logout()
            .then(() => {
                router.push("/");
            })
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