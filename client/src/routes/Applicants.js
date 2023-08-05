import LoggedInContainer from "../containers/LoggedInContainer";
import { Jobcard } from "./Jobcard";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography, Checkbox } from "@material-tailwind/react";

const Applicants = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <div>
                <div className="mx-8 text-4xl font-semibold text-color6">
                    Applicants
                </div>
                <div className="m-8 italic text-lg text-color6">
                    Select the Applicants you wish to send assesment links to
                </div>
               <div className="m-8 p-2 w-2/3 flex justify-between rounded-xl bg-color1">
               <Checkbox color="#EE4774" ripple={true} />
               <div className="mt-3 mx-12 text-white grow">
                Sandeep Chaudhary
               </div>
               <div className="mt-3 mx-12 text-white flex-none">
                8.5
               </div>
               </div>
            </div>
        </LoggedInContainer>
    );
};

export default Applicants;