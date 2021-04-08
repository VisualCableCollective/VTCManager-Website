import React from 'react';

import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {useParams} from 'react-router-dom';
import HTTPRequestUtils from "../../Utils/HTTPRequestUtils";
import {toast} from "react-toastify";

import User from "../../Models/User";

library.add(fas)

export default function CompanyJobApplicationPage() {
    let { id } = useParams();
    return <CompanyJobApplicationPageClass application_id={id} />;
}

class CompanyJobApplicationPageClass extends React.Component {

    application_id = 1;
    speedChartTheme = null;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            data: [],
            showButtons: false,
            disableButtons: false,
        };
        this.application_id = this.props.application_id;
        this.handleAcceptApplication = this.handleAcceptApplication.bind(this);
        this.handleDeclineApplication = this.handleDeclineApplication.bind(this);

        if(!User.isOwnerOfCompany()){
            window.location.href = "/";
            return;
        }
    }

    componentDidMount() {
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyApplication, "", this.application_id), { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    let showButtons = false;
                    if(result.status === "pending"){
                        showButtons = true;
                    }
                    this.setState({
                        data: result,
                        showButtons: showButtons,
                    });
                },
                (error) => {
                }
            )
    }

    handleAcceptApplication(){
        if(this.state.disableInput)
            return;

        this.setState({
            disableButtons: true,
        });

        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type': 'application/json' })
        };

        let thisComponent = this;
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyAcceptApplication, "", this.application_id), requestOptions)
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

    handleDeclineApplication(){
        if(this.state.disableInput)
            return;

        this.setState({
            disableButtons: true,
        });
        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type': 'application/json' })
        };

        let thisComponent = this;
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyDeclineApplication, "", this.application_id), requestOptions)
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


    render() {

        return (
            (<div className="page-wrapper p-6 navbar-top-margin">
                <div className="w-full bg-dark-3 rounded p-5 mb-6">
                    <h1 className="text-3xl text-center font-bold">Application by { this.state.data.applicant ? this.state.data.applicant.username : "n/a"}</h1>
                </div>
                <div className="w-full bg-dark-3 rounded px-5 py-7 my-6 grid grid-cols-3 gap-4">
                    <div className="mx-auto">
                        <h1 className="font-bold text-2xl mb-3 text-center">Application Information</h1>
                        <div className="flex items-center mb-1">
                            <FontAwesomeIcon icon="clock" size="lg" className="mr-3"/>
                            <p>Created at { new Date(this.state.data.created_at).toLocaleString() || "n/a"}</p>
                        </div>
                        <div className="flex items-center mb-1">
                            <FontAwesomeIcon icon="info-circle" size="lg" className="mr-3"/>
                            <p>Status: { this.state.data.status || "n/a"}</p>
                        </div>
                        {this.state.showButtons &&
                        <div className="flex items-center mt-5">
                            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-1 w-full disabled:opacity-50" onClick={this.handleAcceptApplication} disabled={this.state.disableButtons}>Accept</button>
                            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-1 w-full disabled:opacity-50" onClick={this.handleDeclineApplication} disabled={this.state.disableButtons}>Decline</button>
                        </div>
                        }
                    </div>
                    <div className="mx-auto">
                        <h1 className="font-bold text-2xl mb-3 text-center">Applicant Information</h1>
                        <div className="flex items-center mb-1">
                            <FontAwesomeIcon icon="user" size="lg" className="mr-3"/>
                            <p>Username: { this.state.data.applicant ? this.state.data.applicant.username : "n/a"}</p>
                        </div>
                        <div className="flex items-center mb-1">
                            <FontAwesomeIcon icon="fingerprint" size="lg" className="mr-3"/>
                            <p>User ID: { this.state.data.applicant ? this.state.data.applicant.id : "n/a"}</p>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <h1 className="font-bold text-2xl mb-3 text-center">Application</h1>
                        <p>{ this.state.data.application_text || "n/a"}</p>
                    </div>
                </div>
            </div>)
        );
    }
}