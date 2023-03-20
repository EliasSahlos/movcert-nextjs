import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Fade as Hamburger } from "hamburger-react";
import { useEffect, useState } from "react";

function HeaderBar() {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);
    const [color, setColor] = useState("transparent");
    const [textColor, setTextColor] = useState("white");
    const [hamburgerMenuIsOpen, setHamburgerMenuIsOpen] = useState(false)

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
        window.addEventListener("scroll", changeColor);
    }, []);

    return (
        <div style={{ backgroundColor: `${color}` }} className="fixed left-0 top-0 w-full ease-in duration-300 z-[1] h-[90px]">
            <div className="max-w-[1240px] m-auto flex justify-between items-center p-8 text-white md:p-6">
                <Link href="/">
                    <h1 style={{ color: `${textColor}` }} className="text-[20px] lg:text-[30px]">
                        Movcert
                    </h1>
                </Link>
                <ul style={{ color: `${textColor}` }} className="hidden gap-8 md:flex">
                    <li className="p-2 text-[20px]">
                        <Link href="/">Home</Link>
                    </li>
                    <li className="p-2 text-[20px]">
                        <Link href="/concerts">Concerts</Link>
                    </li>
                    <li className="p-2 text-[20px]">
                        <Link href="/movies">Movies</Link>
                    </li>
                </ul>

                {/* Mobile Button */}
                <div className="block z-[2] cursor-pointer md:hidden " onClick={() => {hamburgerMenuHandler(); setHamburgerMenuIsOpen(!hamburgerMenuIsOpen) }}>
                    <div style={{ color: `${textColor}` }}>
                        <Hamburger toggle={setHamburgerMenuIsOpen} toggled={hamburgerMenuIsOpen} size={25}/>
                    </div>
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
                            <Link href="/" onClick={() => {hamburgerMenuCloser(); setHamburgerMenuIsOpen(false)}} className="hover:text-[#FFBA5A]">
                                Home
                            </Link>
                        </li>
                        <li className="p-4 text-4xl">
                            <Link href="/concerts" onClick={() => {hamburgerMenuCloser(); setHamburgerMenuIsOpen(false)}} className="hover:text-[#FFBA5A]">
                                Concerts
                            </Link>
                        </li>
                        <li className="p-4 text-4xl">
                            <Link href="/movies" onClick={() => {hamburgerMenuCloser(); setHamburgerMenuIsOpen(false)}} className="hover:text-[#FFBA5A]">
                                Movies
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default HeaderBar;
