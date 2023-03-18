import HeaderBar from "@/components/HeaderBar";
import "@/styles/globals.css";
import "../styles/mouse-scroll-icon.css"

export default function App({ Component, pageProps }) {
    return (
        <>
                <Component {...pageProps} />
        </>
    );
}
