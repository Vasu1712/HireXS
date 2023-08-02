import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";
import { jobData } from "./JobDetails";

const Jobid = () => {
    return(
        <LoggedInContainer curActiveScreen="home">
        <div className="flex flex-row">
                <div className="w-7/12 h-full bg-color5 ml-10 mr-16 p-4 rounded-xl text-white">
                  <div>
                    Job ID : 4564
                  </div>
                  <div>
                    Senior Software Engineer
                  </div>
                  <div>
                  Drives the execution of multiple business plans and projects by identifying customer and operational needs; developing and communicating business plans and priorities; removing barriers and obstacles that impact performance; providing resources; identifying performance standards; measuring progress and adjusting performance accordingly; developing contingency plans; and demonstrating adaptability and supporting continuous learning. Provides supervision and development opportunities for associates by selecting and training; mentoring; assigning duties; building a team-based work environment; establishing performance expectations and conducting regular performance evaluations; providing recognition and rewards; coaching for success and improvement; and ensuring diversity awareness. Promotes and supports company policies, procedures, mission, values, and standards of ethics and integrity by training and providing direction to others in their use and application; ensuring compliance with them; and utilizing and supporting the Open Door Policy. Ensures business needs are being met by evaluating the ongoing effectiveness of current plans, programs, and initiatives; consulting with business partners, managers, co-workers, or other key stakeholders; soliciting, evaluating, and applying suggestions for improving efficiency and cost-effectiveness; and participating in and supporting community outreach events.
                  </div>
                  <div>
                    Position Description
                  </div>
                  <div>
                    Role Description
                  </div>
                  <div>
                    Required Qualifications
                  </div>
                </div>
                <div className="w-60 h-12 bg-white rounded-xl text-color1 p-3 ml-8 px-20 font-medium text-lg">
                    Apply
                </div>   
</div>        
        </LoggedInContainer>
    );
};

export default Jobid;

