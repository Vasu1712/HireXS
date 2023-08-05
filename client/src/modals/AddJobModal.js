import TextInput from "../components/TextInput";
import { useState } from "react";
import { makeAuthenticatedPOSTRequest } from "../utils/serverHelper";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AddJobModal = ({ closeModal }) => {
    const [jobId, setjobId] = useState("");
    const [description, setdescription] = useState("");
    const [jobTitle, setjobTitle] = useState("");
    const [location, setlocation] = useState("");
    const [salary, setsalary] = useState("");
    const [applicationDate, setapplicationDate] = useState("");

    const navigate = useNavigate();

    const submitJob = async () => {
        if (!jobId || !description || !location || !jobTitle || !salary || !applicationDate) {
            alert('All the fields are required. Please check again');
            return;
        }
        try {
            const data = { jobId, jobTitle, location, salary, description, applicationDate };
            console.log(data);
            const response = await makeAuthenticatedPOSTRequest('/jobslist/createjob', data);

            if (response && !response.error) {
                alert('Success');
                navigate('/jobs');
            } else {
                alert('Failure');
            }
        } catch (error) {
            console.error('Error create new job:', error);
            alert('An error occurred while creating job');
        }
    }

    const handleDateChange = (event) => {
        setapplicationDate(event.target.value);
    };

    return (
        <div
            className="absolute bg-black w-full h-full bg-opacity-50 flex justify-center items-center z-10 overflow-auto"
            onClick={closeModal}
        >
            <div
                className="bg-app-black w-1/3 rounded-md p-8 mt-auto"
                onClick={(e) => {
                    e.stopPropagation();
                }}
            >
                <div className="text-white mb-5 font-semibold text-lg">
                    Add Job Listing
                </div>
                <div className="space-y-4 flex flex-col justify-center items-center">
                    <TextInput
                        label="Job ID"
                        labelClassName={"text-white"}
                        placeholder="Job ID"
                        value={jobId}
                        setValue={setjobId}
                    />
                    <TextInput
                        label="Job Position"
                        labelClassName={"text-white"}
                        placeholder="Job Position"
                        value={jobTitle}
                        setValue={setjobTitle}
                    />
                    <TextInput
                        label="Job Description"
                        labelClassName={"text-white"}
                        placeholder="Job Description"
                        value={description}
                        setValue={setdescription}
                    />
                    <TextInput
                        label="Job Role"
                        labelClassName={"text-white"}
                        placeholder="Job Role"
                        value={location}
                        setValue={setlocation}
                    />
                    <TextInput
                        label="salary"
                        labelClassName={"text-white"}
                        placeholder="Job Role"
                        value={salary}
                        setValue={setsalary}
                    />
                    <TextInput
                        label="Employee Type"
                        labelClassName={"text-white"}
                        placeholder="Job Role"
                        value={applicationDate}
                        setValue={setapplicationDate}
                    />
                    <div
                        className={`textInputDiv flex flex-col space-y-2 w-full text-white`}
                    >
                        <label for="date" className='font-semibold'>
                            Last Date to Register
                        </label>
                        <input type="date" id="date" name="date" class="border-gray-300 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 rounded-md shadow-sm placeholder-gray-500"
                            onChange={handleDateChange} />
                    </div>
                </div>
                <button
                    className="bg-white w-1/3 rounded flex font-semibold justify-center items-center py-3 mt-4 cursor-pointer"
                    onClick={submitJob}
                >
                    Create
                </button>
            </div>
        </div >
    );
}

export default AddJobModal;