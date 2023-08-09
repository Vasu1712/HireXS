import LoggedInContainer from "../containers/LoggedInContainer";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { Card, Typography, CardHeader, CardBody, CardFooter, Tooltip, Carousel, IconButton } from "@material-tailwind/react";
// import { Carousel } from 'react-carousel3d';

const style = {
    width: 297,
    height: 296,
  };

  const cardInfo = [
    {
        id: '1',
        name: 'Abhishek R Konnaraju',
        img:'/profile/Abhishek.jpg',
        linkedin: '',
        github: '',
        email: '',
    },
    {
        id: '2',
        name: 'Aibhinav Upadhay',
        img:'/profile/Aibhinav.png',
        linkedin: '',
        github: '',
        email: '',
    },
    {
        id: '3',
        name: 'Mahika Khushwaha',
        img:'/profile/Mahika.jpg',
        linkedin: '',
        github: '',
        email: '',
    },
    {
        id: '4',
        name: 'Shivang Patel',
        img:'/profile/Shivang.png',
        linkedin: '',
        github: '',
        email: '',
    },
    {
        id: '5',
        name: 'Vasu Pal',
        img:'/profile/Vasu.png',
        linkedin: '',
        github: '',
        email: '',
    },
  ]

const About = () => {
    return (
        <LoggedInContainer curActiveScreen="home">
          <div className="flex flex-wrap gap-5 place-content-center">
          {cardInfo.map((info) => (
                <Card className="w-1/4 h-96 m-2 ">
                <CardHeader floated={false} className="h-80">
                    <img src={info.img} alt="profile" />
                </CardHeader>
                <CardBody className="text-center">
                    <Typography variant="h4" color="blue-gray" className="mb-1">
                    {info.name}
                    </Typography>
                    <Typography color="blue" className="font-medium text-sm mt-2" textGradient>
                    Netaji Subhas University of Technology
                    </Typography>
                </CardBody>
                <CardFooter className="flex justify-center gap-7 pt-1">
                    <Tooltip content="Like">
                        <Icon icon="mdi:linkedin" href={info.linkedin} color="#ee4774" width="30" height="30" />
                    </Tooltip>
                    <Tooltip content="Follow">
                        <Icon icon="mdi:github" href={info.github} color="#ee4774" width="30" height="30" />
                    </Tooltip>
                    <Tooltip content="Follow">
                    <Icon icon="mdi:instagram" href={info.insta} color="#ee4774" width="30" height="30" />
                    </Tooltip>
                </CardFooter>
                </Card>

            ))}
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
          </div>   
        </LoggedInContainer>
    );
};

export default About;



