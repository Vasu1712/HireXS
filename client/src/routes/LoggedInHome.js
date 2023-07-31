import logo from '../assets/images/hirexs_logo.png';
import LogoutComp from '../components/LogoutComp';
import bg from '../assets/images/bg.png';
import { Link } from "react-router-dom";
import { useCookies } from 'react-cookie';

const HomeComponent = () => {
    const [cookie, setCookie] = useCookies(["token"]);

    return (
        <div className="w-full h-full bg-app-black overflow-auto">
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
                <div className='flex'>
                    <LogoutComp />
                    <Link to="/home" className="bg-white h-2/3 px-2 mt-2 flex items-center justify-center rounded-full font-semibold cursor-pointer mr-14">
                        <div>
                            {cookie.username[0]}
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
                <div className='text-white mt-5'>
                    A new LLM based application to ease out the HR process for Axis Bank
                </div>
                <div className='h-2/3 flex items-center justify-center rounded-full font-semibold bg-gradient-to-r from-red-400 to-pink-600 py-3 px-4 mt-6 '>
                    <Link to="/jobs">
                        Start Applying
                    </Link>
                </div>
                <div className='flex justify-center mt-10'>
                    <img src={bg} className='opacity-75 mix-blend-screen w-3/4' />
                </div>
            </div>
        </div>
    )
};

export default HomeComponent;