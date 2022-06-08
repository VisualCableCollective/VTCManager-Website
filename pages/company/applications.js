import {useRouter} from "next/router";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import {useEffect, useState} from "react";
import {HTTPRequestUtils} from "../../utils/HTTPRequestUtils";
import User from "../../models/User";

export default function CompanyApplicationsPage() {
    const router = useRouter();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(router.query.page);

    useEffect(() => {
        if(!User.isOwnerOfCompany()){
            router.push("/");
            return;
        }
        loadData();
    }, []);

    function loadData() {
        setLoading(true);

        fetch(HTTPRequestUtils.getUrl(HTTPRequestUtils.API_routes.CompanyApplications, "page=" + currentPage), { headers: new Headers({ 'Authorization': 'Bearer ' + sessionStorage.getItem('authtoken'), 'Accept': 'application/json' }) })
            .then(res => res.json())
            .then(
                (result) => {
                    setData(result);
                    setLoading(false);
                },
                (error) => {
                }
            )
    }

    function handlePageClick(data) {
        setData([]);
        setCurrentPage(data.selected + 1);
        router.push("/company/applications?page=" + (data.selected + 1));
        loadData();
    }

    let applications = [];
    if(data["data"]){
        data["data"].forEach(function(element) {
            applications.push(
                <tr key={"application-" + element.id} className="border-t border-b border-white border-opacity-40">
                    <td className="px-5 text-center py-2">{element.id || "n/a"}</td>
                    <td className="px-5 text-center py-2">{element.applicant.username || "n/a"}</td>
                    <td className="px-5 text-center py-2">{element.status || "n/a"}</td>
                    <td className="px-5 text-center py-2">{new Date(element.created_at).toLocaleString() || "n/a"}</td>
                    <td className="px-5 text-center py-4">
                        <Link href={"/company/application/" + element.id}>
                            <a className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                {element.status === "pending" ? "Review" : "View"}
                            </a>
                        </Link>
                    </td>
                </tr>
            );
        });
    }

    return (
        (
            <div>
                <div className="page-wrapper p-6 navbar-top-margin">
                    <div className="w-full bg-dark-3 rounded p-5 mb-6">
                        <h1 className="font-bold text-3xl text-center mb-5">Applications</h1>
                        <table className="table-auto w-full">
                            <thead>
                            <tr key="thead-logbook" className="border-t border-b border-white border-opacity-40">
                                <th className="px-5 py-1">Application ID</th>
                                <th className="px-5 py-1">Applicant</th>
                                <th className="px-5 py-1">Status</th>
                                <th className="px-5 py-1">Created At</th>
                                <th className="px-5 py-1"/>
                            </tr>
                            </thead>
                            <tbody>
                            {applications}
                            </tbody>
                        </table>
                        <div className={loading ? "block" : "hidden"}>
                            <h1 className="font-bold text-2xl text-center p-4">Loading...</h1>
                        </div>
                        <div className={"flex justify-center"}>
                            {data["data"] &&
                                <ReactPaginate
                                    onPageChange={handlePageClick}
                                    initialPage={data["current_page"]-1}
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
                </div>
            </div>
        )
    );
}