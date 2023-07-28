import logo from '../assets/images/hirexs_logo.png';
import { Link } from "react-router-dom";

const HomeComponent = () => {
    return (
        <div className="w-full h-full bg-app-black">
            <div className="flex p-8 justify-between font-semibold">
                <div className='ml-10'>
                    <Link to="/home">
                        <img src={logo} style={{ width: "209px", height: "51px" }} />
                    </Link>
                </div>
                <div className='text-white text-xl mt-3'>
                    <Link to={"/home"} className='pr-10'>Home</Link>
                    <Link to={"/jobs"} className='pr-10'>All Jobs</Link>
                    <Link to={"/past"} className='pr-10'>Past</Link>
                    <Link to={"/about"}>About</Link>
                </div>
                <div>
                    <Link to="/login" className="bg-white h-2/3 px-6 mt-2 flex items-center justify-center rounded-full font-semibold cursor-pointer mr-14">
                        Log in
                    </Link>
                </div>
            </div>
            <div className='text-center'>
                <div className='text-white text-5xl'>
                    Welcome to
                </div>
            </div>
        </div>
    )
};

export default HomeComponent;