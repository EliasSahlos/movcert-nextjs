import HeaderBar from "@/components/HeaderBar";
import "@/styles/globals.css";
import "../styles/mouse-scroll-icon.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider, useTheme } from "next-themes";

export default function App({ Component, pageProps }) {
    const { theme, setTheme } = useTheme();
    const [screenWidth, setScreenWidth] = useState(0)

    useEffect(() => {
        AOS.init({
            easing: "ease-out-cubic",
            once: true,
            offset: 50,
            duration: 600,
        });
        
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };

    }, []);
    return (
        <>
            <ThemeProvider forcedTheme={Component.theme || null}>
                <HeaderBar />
                <Component {...pageProps} screenWidth={screenWidth} />
            </ThemeProvider>
        </>
    );
}
