import ReactPaginate from "react-paginate";
import User from "../../models/User";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {HTTPRequestUtils} from "../../utils/HTTPRequestUtils";
import {toast} from "react-toastify";
import {useAuth} from "../../contexts/AuthContext";

export default function CompanyEmployeesPage() {
    const router = useRouter();
    const auth = useAuth();

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(router.query.page || 1);
    const [data, setData] = useState([]);

    const loadData = useCallback((page) => {
        setLoading(true);

        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyEmployees, "page=" + page), { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    console.log(result);
                    setData(result);
                    setLoading(false);
                },
                (error) => {
                    console.error(error);
                    toast.error('An error occurred while loading the employees.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId: "load-employees-error",
                    });
                }
            )
    }, []);

    function kickEmployee(userID) {
        let kickButton = document.getElementById("kick-employee-button-" + userID);
        kickButton.disabled = true;

        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyKickEmployee, "", userID), { headers: new Headers({ 'Authorization': 'Bearer ' + localStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(function (response) {
                if (response.status !== 200) {
                    kickButton.disabled = false;
                    toast.error('An error occurred while kicking the employee.', {
                        position: "bottom-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        toastId: "kick-employee-error",
                    });
                    return response.json();
                }
                let newData = data;
                data["data"].forEach(function (element, index) {
                    if (element.id === userID) {
                        newData["data"].splice(index, 1);
                    }
                })
                setData(newData);
                toast.success('Employee was successfully kicked out of your company!', {
                    position: "bottom-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    toastId: "kick-employee-success",
                });
            })
    }

    async function handlePageClick(data) {
        setData([]);
        setCurrentPage(data.selected + 1);
        await router.push("/company/employees?page=" + (data.selected + 1))
    }

    let employeesRows = [];
    if (data["data"]) {
        data["data"].forEach(function (element) {
            let kickButton;
            if (auth.user.isOwnerOfCompany() && element.id !== auth.user.ID)
                kickButton = <button id={"kick-employee-button-" + element.id} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50" onClick={() => kickEmployee(element.id)}>Kick</button>;

            employeesRows.push(
                <tr key={"employee-" + element.id} className="border-t border-b border-white border-opacity-40">
                    <td className="px-5 text-center py-2">{element.id || "n/a"}</td>
                    <td className="px-5 text-center py-2">{element.username || "n/a"}</td>
                    <td className="px-5 text-center py-4">{kickButton}</td>
                </tr>
            );
        });
    }

    useEffect(() => {
        loadData(currentPage);
    }, [currentPage, loadData]);

    return (
        (
            <div>
                <div className="page-wrapper p-6 navbar-top-margin">
                    <div className="w-full bg-dark-3 rounded p-5 mb-6 overflow-x-auto">
                        <h1 className="font-bold text-3xl text-center mb-5">Employees</h1>
                        <table className="table-auto w-full">
                            <thead>
                            <tr key="thead-logbook" className="border-t border-b border-white border-opacity-40">
                                <th className="px-5 py-1">ID</th>
                                <th className="px-5 py-1">Username</th>
                                <th className="px-5 py-1" />
                            </tr>
                            </thead>
                            <tbody>
                            {employeesRows}
                            </tbody>
                        </table>
                        <div className={loading ? "block" : "hidden"}>
                            <h1 className="font-bold text-2xl text-center p-4">Loading...</h1>
                        </div>
                        <div className={"flex justify-center"}>
                            {data["data"] &&
                                <ReactPaginate
                                    onPageChange={handlePageClick}
                                    initialPage={data["current_page"] - 1}
                                    disableInitialCallback={true}
                                    pageCount={data["last_page"]}
                                    pageRangeDisplayed={3}
                                    marginPagesDisplayed={2}
                                    containerClassName={"relative z-0 inline-flex shadow-sm -space-x-px pt-5"}
                                    pageClassName={"relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"}
                                    previousLabel={<div><span className="sr-only">Previous</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                             fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                                                  clipRule="evenodd" />
                                        </svg></div>}
                                    previousClassName={"relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"}
                                    nextLabel={<div>
                                        <span className="sr-only">Next</span>
                                        <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                                             fill="currentColor" aria-hidden="true">
                                            <path fillRule="evenodd"
                                                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                                  clipRule="evenodd" />
                                        </svg>
                                    </div>}
                                    nextClassName={"relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"}
                                    breakLabel={<span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">...</span>}
                                />
                            }

                        </div>
                    </div>
                </div>
            </div>
        )
    );
}