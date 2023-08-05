import LoggedInContainer from "../containers/LoggedInContainer";
import { Jobcard } from "./Jobcard";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography, CardBody, CardFooter, Button } from "@material-tailwind/react";

const Applicants = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <div>
                <div className="mx-8 text-4xl font-semibold text-color6">
                    Applicants
                </div>
               <div>
                
               </div>
            </div>
        </LoggedInContainer>
    );
};

export default Applicants;