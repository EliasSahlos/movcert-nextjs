import Link from "next/link";
import {Fade as Hamburger} from "hamburger-react";
import {useEffect, useState} from "react";
import {UserAuth} from "@/context/AuthContext";
import {useRouter} from "next/router";

function HeaderBar() {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const [color, setColor] = useState("transparent");
    const [textColor, setTextColor] = useState("white");
    const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false);
    const [screenWidth, setScreenWidth] = useState(0)

    let router = useRouter();
    const {user, logOut} = UserAuth();

    function hamburgerMenuHandler() {
        setHamburgerMenu(!hamburgerMenu);
    }

    function hamburgerMenuCloser() {
        setHamburgerMenu(false);
    }

    useEffect(() => {
        function changeColor() {
            if (window.scrollY >= 90) {
                setColor("#ffffff");
                setTextColor("#000000");
            } else {
                setColor("transparent");
                setTextColor("#ffffff");
            }
        }

        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", changeColor);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    async function handleLogout() {
        try {
            await logOut();
            router.push("/");
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div style={{backgroundColor: `${color}`}}
             className="fixed left-0 top-0 w-full ease-in duration-300 z-50 h-[90px]">
            <div className="max-w-[1240px] m-auto flex justify-between items-center p-8 text-white md:p-6">
                <Link href="/">
                    <h1 style={{color: `${textColor}`}} className="text-[20px] lg:text-[30px]">
                        Movcert
                    </h1>
                </Link>
                <ul style={{color: `${textColor}`}} className="hidden gap-8 md:flex">
                    <li className="p-2 text-[20px]">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-2 text-[20px]">
                        <Link href="/concerts">Concerts</Link>
                    </li>
                    <li className="p-2 text-[20px]">
                        <Link href="/movies">Movies</Link>
                    </li>
                    {user?.email ? (
                        <>
                            <li className="p-2 text-[20px]">

                                <Link href="/account">Account</Link>

                            </li>
                            <li onClick={handleLogout}
                                className="cursor-pointer p-2 text-[20px] bg-[#ffba5a] px-6 rounded-lg text-black ">
                                Logout
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="p-2 text-[20px]">
                                <Link href="/login">Login</Link>
                            </li>
                            <li className="cursor-pointer p-2 text-[20px] bg-[#ffba5a] px-6 rounded-lg text-black ">
                                <Link href="/register">Register</Link>
                            </li>
                        </>
                    )}
                </ul>

                {/* Mobile Button */}
                <div
                    className="block z-[2] cursor-pointer md:hidden "
                    onClick={() => {
                        hamburgerMenuHandler();
                        setHamburgerMenuIsOpen(!hamburgerMenuIsOpen);
                    }}
                >
                    {screenWidth <= 766 && hamburgerMenuIsOpen === true ?
                        <div style={{color: "white"}}>
                            <Hamburger toggle={setHamburgerMenuIsOpen} toggled={hamburgerMenuIsOpen} size={25}/>
                        </div> :
                        <div style={{color: `${textColor}`}}>
                            <Hamburger toggle={setHamburgerMenuIsOpen} toggled={hamburgerMenuIsOpen} size={25}/>
                        </div>}

                </div>
                {/* Mobile Menu */}
                <div
                    className={
                        hamburgerMenu
                            ? "absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 md:hidden"
                            : "absolute top-0 left-[100%] right-0 bottom-0 flex justify-center items-center w-full h-screen bg-black text-center ease-in duration-300 md:hidden"
                    }
                >
                    <ul>
                        <li className="p-4 text-4xl">
                            <Link
                                href="/"
                                onClick={() => {
                                    hamburgerMenuCloser();
                                    setHamburgerMenuIsOpen(false);
                                }}
                                className="hover:text-[#FFBA5A]"
                            >
                                Home
                            </Link>
                        </li>
                        <li className="p-4 text-4xl">
                            <Link
                                href="/concerts"
                                onClick={() => {
                                    hamburgerMenuCloser();
                                    setHamburgerMenuIsOpen(false);
                                }}
                                className="hover:text-[#FFBA5A]"
                            >
                                Concerts
                            </Link>
                        </li>
                        <li className="p-4 text-4xl">
                            <Link
                                href="/movies"
                                onClick={() => {
                                    hamburgerMenuCloser();
                                    setHamburgerMenuIsOpen(false);
                                }}
                                className="hover:text-[#FFBA5A]"
                            >
                                Movies
                            </Link>
                        </li>
                        {user?.email ? (
                            <>
                                <li className="p-4 text-4xl">

                                    <Link
                                        href="/account"
                                        onClick={() => {
                                            hamburgerMenuCloser();
                                            setHamburgerMenuIsOpen(false);
                                        }}
                                        className="hover:text-[#FFBA5A]"
                                    >
                                        Account
                                    </Link>
                                </li>
                                <li
                                    onClick={() => {
                                        hamburgerMenuCloser();
                                        setHamburgerMenuIsOpen(false);
                                        handleLogout();
                                    }}
                                    className="p-4 text-4xl hover:text-[#FFBA5A]"
                                >
                                    Logout
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="p-4 text-4xl">
                                    <Link
                                        href="/register"
                                        onClick={() => {
                                            hamburgerMenuCloser();
                                            setHamburgerMenuIsOpen(false);
                                        }}
                                        className="hover:text-[#FFBA5A]"
                                    >
                                        Register
                                    </Link>
                                </li>
                                <li className="p-4 text-4xl">
                                    <Link
                                        href="/login"
                                        onClick={() => {
                                            hamburgerMenuCloser();
                                            setHamburgerMenuIsOpen(false);
                                        }}
                                        className="hover:text-[#FFBA5A]"
                                    >
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeaderBar;
