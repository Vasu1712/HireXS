import { useContext, useState, useLayoutEffect, useRef } from "react";
import { Howl, Howler } from "howler";
import { Icon } from "@iconify/react";
import hirexs_logo from "../assets/images/hirexs_logo.png";
import IconText from "../components/shared/IconText";
import TextWithHover from "../components/shared/TextWithHover";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const LoggedInContainer = ({ children, curActiveScreen }) => {

    const [cookie, setCookie] = useCookies(["token"]);
    const [cookies, setCookies] = useCookies(["username"]);
    const navigate = useNavigate();
    const logout = () => {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        window.location.reload(true);
    };

    const LogoutComp = () => {
        return (
            <div className="flex items-center justify-start cursor-pointer"
                onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}>
                <IconText
                    iconName={"tabler:logout"}
                    displayText={"Logout"}
                    targetLink={"/logout"}
                    color={"red"}
                />
            </div>
        );
    };

    return (
        <div className="h-full w-full bg-app-black">
            <div className={"h-full w-full flex"}>
                <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
                    <div className="p-5">
                        <div className="logoDiv p-5">
                            <Link to="/home">
                                <img
                                    src={hirexs_logo}
                                    alt="HireXS Logo"
                                    width={175}
                                />
                            </Link>
                        </div>
                        <div className="py-5">
                            <IconText
                                iconName={"ic:round-home"}
                                displayText={"Home"}
                                targetLink={"/home"}
                                active={curActiveScreen === "home"}
                                color={"gray"}
                            />
                            <IconText
                                iconName={"uil:suitcase"}
                                displayText={"Jobs"}
                                targetLink={"/jobs"}
                                active={curActiveScreen === "jobs"}
                                color={"gray"}
                            />
                            <IconText
                                iconName={"mdi:about"}
                                displayText={"About"}
                                active={curActiveScreen === "about"}
                                targetLink={"/about"}
                                color={"gray"}
                            />
                        </div>
                    </div>
                    <div className="p-5">
                        <IconText
                            iconName={"ic:outline-settings"}
                            displayText={"Settings"}
                            // targetLink={"/settings"}
                            active={curActiveScreen === "settings"}
                            color={"gray"}
                        />
                        <IconText
                            iconName={"material-symbols:help-outline"}
                            displayText={"Help & Support"}
                            active={curActiveScreen === "help"}
                            targetLink={"/help"}
                            color={"gray"}
                        />
                        <LogoutComp />
                    </div>
                </div>
                <div className="h-full w-4/5 bg-app-black overflow-auto">
                    <div className="navbar w-full h-1/10 flex items-end justify-end over pr-10 pt-10">
                        <div className="flex h-full">
                            <div className="w-1/4 flex justify-around h-full items-center">
                                <div className="bg-white ml-10 px-4 py-2 flex items-center justify-center rounded-full font-semibold cursor-pointer">
                                    {cookie?.username[0].toUpperCase()}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="content p-10 pt-10 overflow-auto">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoggedInContainer;