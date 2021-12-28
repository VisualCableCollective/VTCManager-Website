import React from 'react';
import { toast } from 'react-toastify';

import AppConfig from '../models/AppConfig';

export default class ActivateLicenseKeyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            licenseKey: '',
            disableInput: false,
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ licenseKey: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ disableInput: true });
        let url = AppConfig.server_url + 'api/user/activate';
        fetch(url, {
            method: "post",
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type':'application/json' }),
            body: JSON.stringify({
                "licenseKey": this.state.licenseKey
            }),
        })
            .then(
                (result) => {
                    result.json().then((content) => {
                        this.setState({ disableInput: false });
                        if(content["success"] === true){
                            this.setState({ error: false });
                            window.location.href = "/";
                        }else{
                            this.handleActivationError(content, result.status);
                        }
                    });
                }
            )
    }

    handleActivationError(serverResponse, status){
        this.setState({ error: true });
        let error_message = "An error has occurred while activating your account.";
        
        if (status === 404){
            error_message = "The specified license key doesn't exist.";
        } else if (serverResponse["message"] === "The given data was invalid.") {
            error_message = "Please enter a valid license key!";
        } else if (serverResponse["error"] === "LICENSE_KEY_ALREADY_IN_USE") {
            error_message = "The specified license key is already used by another user.";
        }

        toast.error(error_message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "notify_user_activation_error",
        });
    }

    render() {
        return (
            <div className="page-wrapper p-6 navbar-top-margin">
                <div className="w-full bg-dark-3 rounded p-5 my-6 max-w-4xl mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="font-bold text-3xl text-center mb-5">Activate Your Account</h1>
                        <p className="text-center mb-4">Here you can activate your VTCManager account with a license key you have received. Without a valid license key, you won't be able to use the VTCManager.</p>
                        <div className="mb-4">
                            <input className={"shadow-inner focus:shadow rounded w-full py-2 px-3 placeholder-gray-400 bg-dark-4 focus:bg-dark-5 transition-all duration-75 outline-none" + (this.state.error ? " border-2 border-red-500" : "")} type="text" placeholder="License Key" maxLength="255" minLength="5" required value={this.state.licenseKey} onChange={this.handleChange} disabled={this.state.disableInput}/>
                        </div>
                        <button type="submit" className={"w-full p-3 rounded transition-all duration-100 mt-3" + (this.state.disableInput ? " bg-green-700" : " bg-green-600 hover:bg-green-700")} id="LoginSubmitBtn" disabled={this.state.disableInput}>
                            <div className="flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" height="16" viewBox="0 0 38 38" stroke="#fff" className={"pr-2" + (this.state.disableInput ? "" : " hidden")} id="LoginSubmitLoadingSVG">
                                    <g fill="none" fillRule="evenodd">
                                        <g transform="translate(1 1)" strokeWidth="2">
                                            <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
                                            <path d="M36 18c0-9.94-8.06-18-18-18">
                                                <animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="1s" repeatCount="indefinite" />
                                            </path>
                                        </g>
                                    </g>
                                </svg>
                                <span id="LoginSubmitBtnText">Activate Account</span>
                            </div>
                        </button>
                    </form>
                </div>
            </div>);
    }
}