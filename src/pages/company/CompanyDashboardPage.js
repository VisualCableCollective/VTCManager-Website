import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import NumberFormat from 'react-number-format';
import {Link} from 'react-router-dom';

//Models
import User from "../../models/User";

//Utils
import LogbookUtils from "../../utils/LogbookUtils";
import HTTPRequestUtils from "../../utils/HTTPRequestUtils";


library.add(fas)

export default class CompanyDashboardPage extends React.Component {

    currentPage = 1;

    constructor(props) {
        super(props);
        this.state = {
            dashboardData: []
        };
    }

    componentDidMount() {
        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyDashboard), { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    this.setState({
                        dashboardData: result
                    });
                },
                (error) => {
                }
            )
    }

    render() {

        let { dashboardData } = this.state;

        let tableContent = [];
        if (dashboardData["latest_5_tours"]) {
            dashboardData["latest_5_tours"].forEach(element => {
                tableContent.push(
                    <tr key={"logbook-entry-" + element.id} className="border-t border-b border-white border-opacity-40">
                        <td className="px-5 text-center py-2">{element.id || "n/a"}</td>
                        <td className="px-5 text-center py-2">{element.city_departure.name || "n/a"}, {element.company_departure.name || "n/a"}</td>
                        <td className="px-5 text-center py-2">{element.city_destination.name || "n/a"}, {element.company_destination.name || "n/a"}</td>
                        <td className="px-5 text-center py-2"><div className="flex"><div className="flex items-center mx-auto">{LogbookUtils.getJobStatusIcon(element.status)} {LogbookUtils.getJobStatusText((element.status))}</div></div></td>
                        <td className="px-5 text-center py-2">{LogbookUtils.getCargoName(element.cargo)}</td>
                        <td className="px-5 text-center py-2">{element.truck_model.truck_manufacturer.name || "n/a"} {element.truck_model.name || "n/a"}</td>
                        <td className="px-5 text-center py-2">{<NumberFormat value={element.income} thousandSeparator="." decimalSeparator="," displayType="text" suffix="€" defaultValue={0} fixedDecimalScale={true} decimalScale={2} />}</td>
                        <td className="px-5 text-center py-4"><Link className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" to={"/job/" + element.id}>View</Link></td>
                    </tr>
                );
            });
        }

        return (
            (<div className="page-wrapper p-6 navbar-top-margin">
                <div className="w-full bg-dark-3 rounded p-5 mb-6">
                    <h1 className="text-3xl text-center font-bold">{User.company_data["name"]}: Dashboard</h1>
                </div>
                <div className="top-stats-overview-wrapper w-full grid gap-6 sm:grid-cols-5">
                    <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                        <div className="flex-grow self-center">
                            <h1 className="text-3xl">{dashboardData["jobs_delivered_total"] || "-"}</h1>
                            <p className="text-opacity-70 text-white mt-1">Jobs delivered (Total)</p>
                        </div>
                        <div className="flex-none self-center">
                            <FontAwesomeIcon icon="clipboard-check" size="3x" />
                        </div>
                    </div>
                    <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                        <div className="flex-grow self-center">
                            <h1 className="text-3xl">{dashboardData["jobs_delivered_7_days"] || "-"}</h1>
                            <p className="text-opacity-70 text-white mt-1">Jobs delivered<br />(Last 7 Days)</p>
                        </div>
                        <div className="flex-none self-center">
                            <FontAwesomeIcon icon="truck" size="3x" />
                        </div>
                    </div>
                    <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                        <div className="flex-grow self-center">
                            <h1 className="text-3xl"><NumberFormat value={dashboardData["bank_balance"]} thousandSeparator="." decimalSeparator="," displayType="text" suffix="€" defaultValue={0} fixedDecimalScale={true} decimalScale={2} /></h1>
                            <p className="text-opacity-70 text-white mt-1">Current Account Balance</p>
                        </div>
                        <div className="flex-none self-center">
                            <FontAwesomeIcon icon="coins" size="3x" />
                        </div>
                    </div>
                    <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                        <div className="flex-grow self-center">
                            <h1 className="text-3xl">{dashboardData["employees_total"]}</h1>
                            <p className="text-opacity-70 text-white mt-1">Employees</p>
                        </div>
                        <div className="flex-none self-center">
                            <FontAwesomeIcon icon="users" size="3x" />
                        </div>
                    </div>
                    <div className="stats-card rounded h-28 w-full bg-dark-3 p-5 flex">
                        <div className="flex-grow self-center">
                            <h1 className="text-3xl">{dashboardData["employees_online"]}</h1>
                            <p className="text-opacity-70 text-white mt-1">Employees Online</p>
                        </div>
                        <div className="flex-none self-center">
                            <FontAwesomeIcon icon="signal" size="3x" color="#24f23c" />
                        </div>
                    </div>
                </div>
                <div className="w-full bg-dark-3 rounded p-5 my-6">
                    <h1 className="font-bold text-3xl text-center mb-5">The latest 5 tours in this company</h1>
                    <table className="5-latest-tours-table table-auto w-full bg-dark-3 rounded p-5">
                        <thead>
                        <tr key="thead-logbook" className="border-t border-b border-white border-opacity-40">
                            <th className="px-5 py-1">ID</th>
                            <th className="px-5 py-1">Departure</th>
                            <th className="px-5 py-1">Destination</th>
                            <th className="px-5 py-1">Status</th>
                            <th className="px-5 py-1">Cargo</th>
                            <th className="px-5 py-1">Truck</th>
                            <th className="px-5 py-1">Income</th>
                            <th className="px-5 py-1"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {tableContent}
                        </tbody>
                    </table>
                </div>
            </div>)
        );
    }
}