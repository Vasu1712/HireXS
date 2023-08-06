import LoggedInContainer from "../containers/LoggedInContainer";
import AddJobModal from "../modals/AddJobModal";
import { Jobcard } from "./Jobcard";
import { useState, useEffect } from "react";
import axios from "axios";

const HRjobs = () => {
    const [AddJobModalOpen, setAddJobModalOpen] = useState(false);
    const [jobsData, setJobsData] = useState([]);
    useEffect(() => {
        axios
            .get('http://localhost:8080/jobslist/jobs')
            .then((response) => {
                setJobsData(response.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);
    return (
        <div className="h-screen w-screen">
            {AddJobModalOpen && (
                <AddJobModal
                    closeModal={() => {
                        setAddJobModalOpen(false);
                    }}
                />
            )}
            <LoggedInContainer curActiveScreen="home">
                <div>
                    <div className="mx-8 text-4xl font-semibold text-color6">
                        Current Job Openings
                    </div>
                    <button className="text-white mx-8 mt-5 border rounded-full px-3 py-2 bg-color1"
                        onClick={() => {
                            setAddJobModalOpen(true);
                        }}>
                        List a new job
                    </button>
                    <div className="w-full ml-8 flex flex-wrap gap-6">
                        {jobsData.map(({ jobTitle, jobId, location, jobType, experience, applicationDate, _id }) => (
                            <Jobcard
                                key={_id}
                                JobTitle={jobTitle}
                                JobId={jobId}
                                location={location}
                                JobType={jobType}
                                Experience={experience}
                                LastDate={applicationDate}
                            />
                        ))}
                    </div>
                </div>
            </LoggedInContainer>
        </div>
    );
};

export default HRjobs;