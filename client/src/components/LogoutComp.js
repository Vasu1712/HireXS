const logout = () => {
    // const date = new Date();
    // date.setDate(date.getDate() - 10);
    // setCookie("token", { path: "/", expires: date });
    // Cookies.remove();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    document.cookie = "username=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
    // removeCookie("token");
    // localStorage.removeItem('token')
    // window.localStorage.clear();
    window.location.reload(true);
};

const LogoutComp = () => {
    return (
        <div className="bg-gradient-to-r from-red-400 to-pink-600 h-2/3 px-3 mt-2 flex items-center justify-center rounded-full font-semibold cursor-pointer mr-4">
            <div
                className={`text-white font-semibold hover:text-black`}
                onClick={(e) => {
                    e.preventDefault();
                    logout();
                }}
            >
                Logout
            </div>
        </div>
    );
};

export default LogoutComp;