import Head from "next/head";
import { Inter } from "next/font/google";
import HeaderBar from "@/components/HeaderBar";
import Navbar from "@/components/HeaderBar";

const inter = Inter({ subsets: ["latin"] });

export default function Home({screenWidth}) {

    
    return (
        <>
            <Head>
                <title>Movcert</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            
            <div className="h-screen bg-cover custom-img">
                <div className="flex items-center justify-center">
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black h-[140px]"/>
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 h-screen" />
                    <div>
                        <h1 className="text-[55px] font-bold text-center  text-white mr-[10px] mt-[90%] md:text-[65px]" data-aos="fade-up">
                            Movcert
                        </h1>
                        <p className="uppercase text-center text-[10px] tracking-[8px] md:text-[15px] text-white" data-aos="fade-up">
                            Tickets Lightning Fast
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
