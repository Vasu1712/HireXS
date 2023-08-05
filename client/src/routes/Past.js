import LoggedInContainer from "../containers/LoggedInContainer";
import { Jobcard } from "./Jobcard";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography, CardBody, CardFooter, Button } from "@material-tailwind/react";

const HRjobs = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <div>
                <div className="mx-8 text-4xl font-semibold text-color6">
                    Current Job Openings
                </div>
                <div className="w-full m-8 flex flex-wrap gap-6">
                    <Jobcard/>
                    <Jobcard/>
                    <Jobcard/>
                    <Jobcard/>
                    <Jobcard/>
                </div>
            </div>
        </LoggedInContainer>
    );
};

export default HRjobs;