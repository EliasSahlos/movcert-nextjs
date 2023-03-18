import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import Link from "next/link";
import { useState } from "react";

function HeaderBar() {
    const [hamburgerMenu, setHamburgerMenu] = useState(false);

    function hamburgerMenuHandler() {
        setHamburgerMenu(!hamburgerMenu);
    }

    function hamburgerMenuCloser(){
        setHamburgerMenu(false)
    }
    return (
        <Box sx={{ flexGrow: 1 }} className="mx-2 lg:mx-9">
            <AppBar position="static" style={{ background: "transparent", boxShadow: "none" }}>
                <Toolbar className="my-4">
                    {/* Left Side */}
                    <div className="flex grow justify-start">
                        <p className="text-[20px] lg:text-[30px] z-30">Movcert</p>
                    </div>
                    {/* Right Side */}
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={hamburgerMenuHandler}>
                        {!hamburgerMenu ? <MenuIcon className="text-[35px] lg:text-[40px] z-30"/> : <CloseIcon className="text-[35px] lg:text-[40px] z-30"/>}
                    </IconButton>
                    {/* Hamburger Menu */}
                    <div
                        className={
                            hamburgerMenu
                                ? "fixed flex justify-center items-center text-[40px] top-0 right-0 w-full h-screen bg-black/100 z-20 ease-in duration-200"
                                : "fixed flex justify-center items-center text-[40px] top-0 right-[-100%] w-full h-screen bg-black/100 z-20 ease-in duration-200"
                        }
                    >
                        <ul className="text-center">
                            <Link href="/" onClick={hamburgerMenuCloser}>
                                <li className="hover:text-[#FFBA5A]">Home</li>
                            </Link>
                            <Link href="/concerts" onClick={hamburgerMenuCloser}>
                                <li className="hover:text-[#FFBA5A]">Concerts</li>
                            </Link>
                            <Link href="/movies" onClick={hamburgerMenuCloser}>
                                <li className="hover:text-[#FFBA5A]">Movies</li>
                            </Link>
                        </ul>
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default HeaderBar;
