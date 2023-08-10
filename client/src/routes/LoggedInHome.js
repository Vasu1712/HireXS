import logo from '../assets/images/hirexs_logo.png';
import LogoutComp from '../components/LogoutComp';
import bg from '../assets/images/bg.png';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

const HomeComponent = () => {
    const [cookie] = useCookies(["token"]);

    return (
        <div className="w-full h-full bg-app-black overflow-auto">
            <div className="flex p-8 justify-between font-semibold">
                <div className='ml-10'>
                    <Link to="/home">
                        <img src={logo} style={{ width: "209px", height: "51px" }} alt="HireXS Logo" />
                    </Link>
                </div>
                <div className='text-white text-xl mt-3'>
                    <Link to={"/home"} className='pr-10 text-white'>Home</Link>
                    <Link to={"/jobs"} className='pr-10 text-color6 active:text-white'>Jobs</Link>
                    <Link to={"/past"} className='pr-10 text-color6 active:text-white'>Past</Link>
                    <Link to={"/about"} className='text-color6 active:text-white'>About</Link>
                </div>
                <div className='flex'>
                    <LogoutComp />
                    <Link to="/home" className="bg-white h-2/3 px-3 mt-2 flex items-center justify-center rounded-full font-semibold cursor-pointer mr-14">
                        <div>
                            {cookie.username[0].toUpperCase()}
                        </div>
                    </Link>
                </div>
            </div>
            <div className='content-between flex flex-col items-center justify-center mt-14'>
                <div className='text-center text-white text-5xl mt-10'>
                    <div className=''>
                        Welcome to
                    </div>
                    <div className='mt-2 text-transparent text-6xl font-semibold bg-clip-text bg-gradient-to-r from-red-400 to-pink-600'>
                        HireXS
                    </div>
                </div>
                <div className='text-color12 mt-5'>
                    A new LLM based application to ease out the HR process for Axis Bank
                </div>
                <div className='h-2/3 flex items-center justify-center rounded-full font-semibold bg-gradient-to-r from-red-400 to-pink-600 py-3 px-4 mt-6 '>
                    <Link to="/jobs">
                        {cookie.access === 'admin' ? ("Manage Jobs") : ("Start Applying")}
                    </Link>
                </div>
                <div className='flex justify-center mt-10'>
                    <img src={bg} className='opacity-75 mix-blend-screen w-3/4' alt="bg" />
                </div>
            </div>
        </div>
    )
};

export default HomeComponent;