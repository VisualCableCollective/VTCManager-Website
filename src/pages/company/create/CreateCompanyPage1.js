import React from 'react';
import { toast } from 'react-toastify';

import AppConfig from '../../../models/AppConfig';

export default class CreateCompanyPage1 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            companyName: '',
            disableInput: false,
            error: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ companyName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        this.setState({ disableInput: true });
        let url = AppConfig.server_url + 'api/company/create';
        fetch(url, {
            method: "post",
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type':'application/json' }),
            body: JSON.stringify({
                "company_name": this.state.companyName
            }),
        })
            .then(
                res => res.json()
            )
            .then(
                (result) => {
                    this.setState({ disableInput: false });
                    if(result["message"] === "SUCCESS"){
                        this.setState({ error: false });
                        window.location.href = "/";
                    }else{
                        this.handleCreateCompanyError(result);
                    }
                }
            )
    }

    handleCreateCompanyError(serverResponse){
        this.setState({ error: true });
        let error_message = "An unknown error has occurred.";
        if(serverResponse["errors"]){
            if(serverResponse["errors"]["company_name"]){
                if(serverResponse["errors"]["company_name"].includes("COMPANY_NAME_ALREADY_IN_USE")){
                    error_message = "Sorry, but this company name is already in use.";
                    toast.error('Sorry, but this company name is already in use.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId: "notify_create_company_error_comp_in_use",
                    });
                }
            }else if(serverResponse["errors"]["user"]){
                if(serverResponse["errors"]["user"].includes("USER_IS_ALREADY_MEMBER_OF_A_COMPANY")){
                    error_message = "You are already an employee in a company. Please leave your current company first to create a new one.";
                }
            }
        }
        toast.error(error_message, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId: "notify_create_company_error_comp_in_use",
        });
    }

    render() {
        return (
            <div className="page-wrapper p-6 navbar-top-margin">
                <div className="w-full bg-dark-3 rounded p-5 my-6 max-w-4xl mx-auto">
                    <form onSubmit={this.handleSubmit}>
                        <h1 className="font-bold text-3xl text-center mb-5">Create Your Own Company</h1>
                        <p className="text-center mb-4">Here you can create the company of your dreams. VTCManager features a bunch of cool functions to manage your company, employees, tours and much more.</p>
                        <div className="mb-4">
                            <input className={"shadow-inner focus:shadow rounded w-full py-2 px-3 placeholder-gray-400 bg-dark-4 focus:bg-dark-5 transition-all duration-75 outline-none" + (this.state.error ? " border-2 border-red-500" : "")} type="text" placeholder="Company Name" maxLength="255" minLength="5" required value={this.state.companyName} onChange={this.handleChange} disabled={this.state.disableInput}/>
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
                                <span id="LoginSubmitBtnText">Create Company</span>
                            </div>
                        </button>
                    </form>
                </div>
            </div>);
    }
}