import {FaClock, FaFingerprint, FaInfoCircle, FaUser} from "react-icons/fa";
import {HTTPRequestUtils} from "../../../utils/HTTPRequestUtils";
import {toast} from "react-toastify";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import User from "../../../models/User";

export default function CompanyApplicationReviewPage() {
    const router = useRouter();

    const [disableButtons, setDisableButtons] = useState(false);
    const [showButtons, setShowButtons] = useState(false);
    const [data, setData] = useState([]);

    let application_id = router.query.applicationId;

    function handleAcceptApplication(){
        if(disableButtons)
            return;

        setDisableButtons(true);

        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type': 'application/json' })
        };

        let thisComponent = this;
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyAcceptApplication, "", application_id), requestOptions)
            .then(function(response) {
                if(response.status !== 204){
                    toast.error('An error occurred while accepting the application.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId: "accept-application-error",
                    });
                    thisComponent.setState({
                        disableButtons: false,
                    });
                    return response.json();
                }
                thisComponent.componentDidMount();
            })
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                }
            )
    }

    function handleDeclineApplication(){
        if(disableButtons)
            return;

        setDisableButtons(true);
        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type': 'application/json' })
        };

        let thisComponent = this;
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyDeclineApplication, "", application_id), requestOptions)
            .then(function(response) {
                if(response.status !== 204){
                    toast.error('An error occurred while declining the application.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId: "decline-application-error",
                    });
                    thisComponent.setState({
                        disableButtons: false,
                    });
                    return response.json();
                }
                thisComponent.componentDidMount();
                toast.success('The application was successfully declined!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: "decline-application-success",
                });
            })
            .then(
                (result) => {
                    console.log(result);
                },
                (error) => {
                }
            )
    }

    useEffect(() => {
        if(!User.isOwnerOfCompany()){
            router.push("/")
            return;
        }

        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyApplication, "", application_id), { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let showButtons = false;
                    if(result.status === "pending"){
                        showButtons = true;
                    }
                    setData(result);
                    setShowButtons(showButtons);
                },
                (error) => {
                }
            )
    }, [])

    return (
        <div className="page-wrapper p-6 navbar-top-margin">
            <div className="w-full bg-dark-3 rounded p-5 mb-6">
                <h1 className="text-3xl text-center font-bold">Application by { data.applicant ? data.applicant.username : "n/a"}</h1>
            </div>
            <div className="w-full bg-dark-3 rounded px-5 py-7 my-6 grid grid-cols-3 gap-4">
                <div className="mx-auto">
                    <h1 className="font-bold text-2xl mb-3 text-center">Application Information</h1>
                    <div className="flex items-center mb-1">
                        <FaClock size="1.25em" className="mr-3"/>
                        <p>Created at { new Date(data.created_at).toLocaleString() || "n/a"}</p>
                    </div>
                    <div className="flex items-center mb-1">
                        <FaInfoCircle size="1.25em" className="mr-3"/>
                        <p>Status: { data.status || "n/a"}</p>
                    </div>
                    {showButtons &&
                        <div className="flex items-center mt-5">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-1 w-full disabled:opacity-50"
                                    onClick={handleAcceptApplication} disabled={disableButtons}>Accept</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-1 w-full disabled:opacity-50"
                                    onClick={handleDeclineApplication} disabled={disableButtons}>Decline</button>
                        </div>
                    }
                </div>
                <div className="mx-auto">
                    <h1 className="font-bold text-2xl mb-3 text-center">Applicant Information</h1>
                    <div className="flex items-center mb-1">
                        <FaUser size="1.25em" className="mr-3"/>
                        <p>Username: { data.applicant ? data.applicant.username : "n/a"}</p>
                    </div>
                    <div className="flex items-center mb-1">
                        <FaFingerprint size="1.25em" className="mr-3"/>
                        <p>User ID: { data.applicant ? data.applicant.id : "n/a"}</p>
                    </div>
                </div>
                <div className="mx-auto">
                    <h1 className="font-bold text-2xl mb-3 text-center">Application</h1>
                    <p>{ data.application_text || "n/a"}</p>
                </div>
            </div>
        </div>
    );
}