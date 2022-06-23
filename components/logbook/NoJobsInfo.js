import {FiPackage} from "react-icons/fi"
import {FaQuestion} from "react-icons/fa"

export function NoJobsInfo() {
    return (
        <div className="w-full mt-4 flex justify-center">
            <div>
                <div className="flex justify-center">
                    <div className="relative px-2.5 pb-1 mb-2">
                        <FiPackage size={60} />
                        <FaQuestion className="absolute bottom-0 right-0 text-amber-400" size={20} />
                    </div>
                </div>
                <h1 className="font-bold text-2xl text-center">No Jobs started</h1>
                <p>No employee has started a job for this company so far. Launch ETS or ATS and accept a job to get started.</p>
            </div>
        </div>
    )
}