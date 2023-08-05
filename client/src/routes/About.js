import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography } from "@material-tailwind/react";

const About = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
            <div>
                Hello
            </div>
        </LoggedInContainer>
    );
};

export default About;


