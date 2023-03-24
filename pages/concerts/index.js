import ConcertCard from "@/components/ConcertCard";
import FilterCard from "@/components/FilterCard";
import Head from "next/head";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

function Concerts({ screenWidth }) {
    const [concerts, setConcerts] = useState([]);

    useEffect(() => {
        async function getConcertData() {
            const concertsData = await getDocs(collection(db, "concerts"));
            setConcerts(concertsData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }
        getConcertData();
    }, []);

    
    return (
        <>
            <Head>
                <title>Movcert</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-[700px] bg-cover custom-img " data-aos="fade">
                <div className="flex items-center justify-center">
                    <div className="absolute h-[700px] top-0 bottom-0 right-0 left-0 bg-black/40 z-0 " />
                    <div className="z-10 mt-[320px]">
                        <h1 className="font-bold text-center text-[50px] text-white mt-[-85px]" data-aos="fade">
                            Concerts
                        </h1>
                        <div className="scroll-downs" data-aos="fade-up">
                            <div className="absolute mousey mt-[40px]">
                                <div className="scroller"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-offset="200" data-aos-once="false">
                    <FilterCard screenWidth={screenWidth} />
                </div>
                <div className="mt-8 p-4 flex justify-center items-center">
                    <ConcertCard screenWidth={screenWidth} concertsData={concerts}/>
                </div>
            </div>
        </>
    );
}

Concerts.theme = "light";
export default Concerts;
