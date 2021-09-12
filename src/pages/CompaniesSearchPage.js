import React from 'react';
import {Redirect, useLocation} from 'react-router-dom';
import HTTPRequestUtils from "../utils/HTTPRequestUtils";
import ReactPaginate from "react-paginate";
import {toast} from "react-toastify";
import User from '../models/User';


export default function CompaniesSearchPage() {
    let query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) + 1;
    return <CompaniesSearchPageClass page={page} />;
}

class CompaniesSearchPageClass extends React.Component {

    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            newPage: false,
            companyName: "",
            loading: true,
            isApplyModalVisible: false,
            ApplyModalCompanyName: "",
            ApplyModalCurrentCompanyID: 0,
            ApplyModalDescriptionContent: "",
            disableModalButtons: false,
        };
        this.currentPage = this.props.page;
        this.handleSearchBarChange = this.handleSearchBarChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.showApplyModal = this.showApplyModal.bind(this);
        this.closeApplyModal = this.closeApplyModal.bind(this);
        this.handleApplyModalDescriptionChange = this.handleApplyModalDescriptionChange.bind(this);
        this.handleApplyModalSubmit = this.handleApplyModalSubmit.bind(this);
    }

    handleSearchBarChange(event) {
        this.setState({ companyName: event.target.value });
    }

    handleSubmit(event){
        event.preventDefault();
        console.log(this.state.companyName);
        this.componentDidMount();
    }

    componentDidMount() {
        this.setState({
            data: [],
            loading: true,
        })
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanySearch, "page=" + this.currentPage + "&q=" + this.state.companyName), { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        data: result,
                        loading: false,
                    })
                },
                (error) => {
                }
            )
    }

    handlePageClick = (data) => {
        this.setState({
            newPage: true,
            data: null
        });
        this.currentPage =  data.selected + 1;
        this.componentDidMount();
    };

    // MODAL

    showApplyModal(company_id, company_name){
        this.setState({
            isApplyModalVisible: true,
            ApplyModalCompanyName: company_name,
            ApplyModalCurrentCompanyID: company_id,
            ApplyModalDescriptionContent: "",
        });
    }

    closeApplyModal(){
        if(this.state.disableModalButtons)
            return;

        this.setState({
            isApplyModalVisible: false,
            ApplyModalCompanyName: "",
            ApplyModalCurrentCompanyID: 0,
            ApplyModalDescriptionContent: "",
        });
    }

    handleApplyModalDescriptionChange(event){
        this.setState({ ApplyModalDescriptionContent: event.target.value });
    }

    handleApplyModalSubmit(event){
        event.preventDefault();

        if(this.state.disableModalButtons)
            return;

        this.setState({
            disableModalButtons: true,
        });

        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json', 'Content-Type': 'application/json' }),
            body: JSON.stringify({ application_text: this.state.ApplyModalDescriptionContent })
        };

        let thisComponent = this;

        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.ApplyAtCompany, "", this.state.ApplyModalCurrentCompanyID), requestOptions)
            .then(function(response) {
                if(response.status !== 201){
                    toast.error('An error occurred while sending the application.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId: "send-application-error",
                    });
                    return response.json();
                }
                toast.success('Your application has been sent successfully!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: "send-application-success",
                });
                thisComponent.setState({
                    disableModalButtons: false,
                });
                thisComponent.closeApplyModal();
            })
            .then(
                (result) => {
                    console.log(result);
                    thisComponent.setState({
                        disableModalButtons: false,
                    });
                },
                (error) => {
                }
            )
    }

    // END MODAL

    render() {

        let thisComponent = this;

        let redirect = null;
        if(this.state.newPage){
            redirect = <Redirect push to={{pathname: "/companies", search: "?page=" + this.currentPage}} />;
        }

        let found_companies = [];
        if(this.state.data["data"]){
            this.state.data["data"].forEach(function(element, index) {
                found_companies.push(
                    <div className={"p-4 flex w-full justify-between items-center border-white border-opacity-40 " + (index === 0 ? "" : "border-t-2")}>
                        <div>
                            <h2 className="text-2xl font-bold">{element.name}</h2>
                            <p>{element.about_us || "No description available"}</p>
                        </div>
                        <div>
                            { element.id === (User.company_data ? User.company_data.id : 0) ? "" : <button onClick={ () => thisComponent.showApplyModal(element.id, element.name) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Apply</button> }
                        </div>
                    </div>
                );
            })
        }

        return (
            (
                <div className="navbar-top-margin">
                    <div className={"fixed z-10 inset-0 overflow-y-auto " + (this.state.isApplyModalVisible ? "block" : "hidden")}>
                        <form
                            onSubmit={ this.handleApplyModalSubmit }
                            className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75"/>
                            </div>
                            <span className="hidden sm:inline-block sm:align-middle sm:h-screen"
                                  aria-hidden="true">&#8203;</span>
                            <div
                                className="inline-block align-bottom bg-dark-3 text-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                                role="dialog" aria-modal="true" aria-labelledby="modal-headline">
                                <div className="bg-dark-3 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div>
                                        <div className="mt-3 text-center sm:mt-0">
                                            <h3 className="text-lg leading-6 font-medium mb-4" id="modal-headline">
                                                Apply at <span id="nameOfCompany">{this.state.ApplyModalCompanyName}</span>
                                            </h3>
                                            <div className="mt-2">
                                                <textarea className="resize-none shadow-inner focus:shadow rounded w-full py-2 px-3 placeholder-gray-400 bg-dark-4 focus:bg-dark-5 transition-all duration-75 outline-none w-full"
                                                          placeholder="Description"
                                                          onChange={this.handleApplyModalDescriptionChange}
                                                          value={this.state.ApplyModalDescriptionContent}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-dark-3 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                    <button type="submit"
                                            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50" disabled={this.state.disableModalButtons}>
                                        Apply
                                    </button>
                                    <button type="button"
                                            onClick={this.closeApplyModal}
                                            className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50" disabled={this.state.disableModalButtons}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="page-wrapper p-6">
                        <div className="w-full bg-dark-3 rounded p-5 mb-6">
                            <h1 className="font-bold text-3xl text-center mb-5">Companies</h1>
                            <div className="mb-4">
                                <form onSubmit={this.handleSubmit} className="flex">
                                    <input
                                        className="shadow-inner focus:shadow rounded w-full py-2 px-3 placeholder-gray-400 bg-dark-4 focus:bg-dark-5 transition-all duration-75 outline-none mr-3" type="text"
                                        placeholder="Search for company..." value={this.state.companyName} onChange={this.handleSearchBarChange} />
                                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Search</button>
                                </form>
                            </div>
                            {found_companies}
                            <div className={this.state.loading ? "block" : "hidden"}>
                                <h1 className="font-bold text-2xl text-center p-4">Loading...</h1>
                            </div>
                            <div className={"flex justify-center"}>
                                {this.state.data["data"] &&
                                <ReactPaginate
                                    onPageChange={this.handlePageClick}
                                    initialPage={this.state.data["current_page"]-1}
                                    disableInitialCallback={true}
                                    pageCount={this.state.data["last_page"]}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    containerClassName={"relative z-0 inline-flex shadow-sm -space-x-px pt-5"}
                                    pageClassName={"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"}
                                    previousLabel={<div><span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                             fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                  clipRule="evenodd"/>
                                        </svg></div>}
                                    previousClassName={"relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"}
                                    nextLabel={<div>
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                             fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                  clipRule="evenodd"/>
                                        </svg>
                                    </div>}
                                    nextClassName={"relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"}
                                    breakLabel={<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>}
                                />
                                }
                            </div>
                        </div>
                        {redirect}
                    </div>
                </div>
            )
        );
    }
}