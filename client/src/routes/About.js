import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography, CardHeader, CardBody, CardFooter, Tooltip } from "@material-tailwind/react";
// import { Carousel } from 'react-carousel3d';

const style = {
    width: 297,
    height: 296,
};

const About = () => {
    return (
        <LoggedInContainer curActiveScreen="about">
            <Card className="w-96 m-32">
                <CardHeader floated={false} className="h-80">
                    <img src="/profile/img1.jpg" alt="profile" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-2">
                        Aibhinav Upadhay
                    </Typography>
                    <Typography color="blue" className="font-medium" textGradient>
                        Netaji Subhas University of Technology
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-2">
                    <Tooltip content="Like">
                        <Typography
                            as="a"
                            href="#facebook"
                            variant="lead"
                            color="blue"
                            textGradient
                        >
                            <Icon icon="mdi:linkedin" color="#ee4774" width="40" height="40" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#twitter"
                            variant="lead"
                            color="light-blue"
                            textGradient
                        >
                            <Icon icon="mdi:github" color="#ee4774" width="40" height="40" />
                        </Typography>
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Typography
                            as="a"
                            href="#instagram"
                            variant="lead"
                            color="purple"
                            textGradient
                        >
                            <Icon icon="mdi:instagram" color="#ee4774" width="40" height="40" />
                        </Typography>
                    </Tooltip>
                </CardFooter>
            </Card>
            {/* <div
                    style={{
                    display: 'flex',
                    justifyContent: 'center',
                    background: 'linear-gradient(to bottom, #16235e 0%, #020223 100%)',
                    }}
                >
                    <Carousel height={460} width={980} yOrigin={42} yRadius={48} autoPlay={true}>
                    <div key={1} style={style}>
                        <img alt="" src="/image/1.png" />
                    </div>
                    <div key={2} style={style}>
                        <img alt="" src="/image/2.png" />
                    </div>
                    <div key={3} style={style}>
                        <img alt="" src="/image/3.png" />
                    </div>
                    <div key={4} style={style}>
                        <img alt="" src="/image/4.png" />
                    </div>
                    <div key={5} style={style}>
                        <img alt="" src="/image/5.png" />
                    </div>
                    <div key={6} style={style}>
                        <img alt="" src="/image/6.png" />
                    </div>
                    </Carousel>
                </div> */}
        </LoggedInContainer>
    );
};

export default About;



