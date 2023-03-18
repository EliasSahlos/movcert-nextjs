import HeaderBar from "@/components/HeaderBar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
    return (
        <>
           
                <Component {...pageProps} />
            
        </>
    );
}
