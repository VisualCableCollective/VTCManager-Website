import React from 'react';
import ReactPaginate from 'react-paginate';

import { fas } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';
import { Redirect } from 'react-router-dom';

import {useLocation} from "react-router-dom";
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';

//Models
import LogbookUtils from "../Utils/LogbookUtils";
import HTTPRequestUtils from "../Utils/HTTPRequestUtils";


library.add(fas)

export default function LogbookPage() {
    let query = new URLSearchParams(useLocation().search);
    const page = parseInt(query.get("page")) + 1;
    return <LogbookPageClass page={page} />;
}

class LogbookPageClass extends React.Component {

    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            items: [],
            newPage: false,
            server_response: null
        };
        this.currentPage = this.props.page;
    }

    componentDidMount() {
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.UserLogbook, "page=" + this.currentPage), { headers: new Headers({'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json'})})
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        items: result["data"],
                        server_response: result
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }

    handlePageClick = (data) => {
        this.setState({
            newPage: true,
            isLoaded: false,
            items: [],
            server_response: null
        });
        this.currentPage =  data.selected + 1;
        this.componentDidMount();
    };

    render() {
        const { error, isLoaded, items, server_response, newPage } = this.state;

        var response;
        if (error) {
            response = <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            response = (
                <div>Loading data...</div>
            );
        } else {
            let tableContent = [];
            items.forEach(element => {
                tableContent.push(
                    <tr key={"logbook-entry-" + element.id} className="border-t border-b border-white border-opacity-40">
                        <td className="px-5 text-center py-2">{element.id || "n/a"}</td>
                        <td className="px-5 text-center py-2">{element.city_departure.name || "n/a"}, {element.company_departure.name || "n/a"}</td>
                        <td className="px-5 text-center py-2">{element.city_destination.name || "n/a"}, {element.company_destination.name || "n/a"}</td>
                        <td className="px-5 text-center py-2"><div className="flex"><div className="flex items-center mx-auto">{LogbookUtils.getJobStatusIcon(element.status)} {LogbookUtils.getJobStatusText((element.status))}</div></div></td>
                        <td className="px-5 text-center py-2">{LogbookUtils.getCargoName(element.cargo)}</td>
                        <td className="px-5 text-center py-2">{element.cargo_damage ? element.cargo_damage + " %" : "n/a"}</td>
                        <td className="px-5 text-center py-2">{element.truck_model.truck_manufacturer.name || "n/a"} {element.truck_model.name || "n/a"}</td>
                        <td className="px-5 text-center py-2">{<NumberFormat value={element.income} thousandSeparator="." decimalSeparator="," displayType="text" suffix="€" defaultValue={0} fixedDecimalScale={true} decimalScale={2} />}</td>
                        <td className="px-5 text-center py-4"><Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={"/job/" + element.id}>View</Link></td>
                    </tr>
                );
            });
            response = (
                <div>
                    <table className="mt-5 table-auto w-full">
                        <thead>
                            <tr key="thead-logbook" className="border-t border-b border-white border-opacity-40">
                                <th className="px-5 py-1">ID</th>
                                <th className="px-5 py-1">Departure</th>
                                <th className="px-5 py-1">Destination</th>
                                <th className="px-5 py-1">Status</th>
                                <th className="px-5 py-1">Cargo</th>
                                <th className="px-5 py-1">Cargo Damage</th>
                                <th className="px-5 py-1">Truck</th>
                                <th className="px-5 py-1">Income</th>
                                <th className="px-5 py-1"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {tableContent}
                        </tbody>
                    </table>
                    <div className={"flex justify-center mt-4"}>
                        <ReactPaginate
                            onPageChange={this.handlePageClick}
                            initialPage={server_response["current_page"]-1}
                            disableInitialCallback={true}
                            pageCount={server_response["last_page"]}
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
                    </div>
                </div>
            );
        }

        let redirect = null;
        if(newPage){
            redirect = <Redirect push to={{pathname: "/logbook", search: "?page=" + this.currentPage}} />;
        }

        return (
            (<div className="p-6 navbar-top-margin">
                <div className="mx-auto sm:px-6 lg:px-8 bg-dark-3 rounded w-full">
                    <div className="overflow-hidden shadow-xl sm:rounded-lg px-5 py-8">
                        <h1 className="font-bold text-3xl text-center mb-7">Logbook</h1>
                        {response}
                        {redirect}
                    </div>
                </div>
            </div>)
        );
    }
}