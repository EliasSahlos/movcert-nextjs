import HeaderBar from "@/components/HeaderBar";
import "@/styles/globals.css";
import "../styles/mouse-scroll-icon.css";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { ThemeProvider, useTheme } from "next-themes";
import { AuthContextProvider } from "@/context/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
    const { theme, setTheme } = useTheme();
    const [screenWidth, setScreenWidth] = useState(0);

    const noAuthRequired = ["/", "/login", "/register", "/concerts"];
    const router = useRouter();

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
            <AuthContextProvider>
                <HeaderBar />
                {noAuthRequired.includes(router.pathname) ? (
                    <>
                        <Component {...pageProps} screenWidth={screenWidth} />
                    </>
                ) : (
                    <>
                        <ProtectedRoute>
                            <Component {...pageProps} screenWidth={screenWidth} />
                        </ProtectedRoute>
                    </>
                )}
            </AuthContextProvider>
        </>
    );
}
