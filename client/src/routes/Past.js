import LoggedInContainer from "../containers/LoggedInContainer";
import AddJobModal from "../modals/AddJobModal";
import { Jobcard } from "./Jobcard";
import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography, CardBody, CardFooter, Button } from "@material-tailwind/react";

const HRjobs = () => {
    const [AddJobModalOpen, setAddJobModalOpen] = useState(false);
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
                        <Jobcard />
                        <Jobcard />
                        <Jobcard />
                        <Jobcard />
                        <Jobcard />
                    </div>
                </div>
            </LoggedInContainer>
        </div>
    );
};

export default HRjobs;