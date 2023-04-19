import ConcertCard from "@/components/ConcertCard";
import FilteredConcertCard from "@/components/FilteredConcertCard";
import FilterCard from "@/components/FilterCard";
import Head from "next/head";
import {collection, getDocs, query, where} from "firebase/firestore";
import {useEffect, useState} from "react";
import {db} from "../../firebase/firebase";
import {UserAuth} from "@/context/AuthContext";

function Concerts({screenWidth}) {
    const [concerts, setConcerts] = useState([]);
    const [filteredConcerts, setFilteredConcerts] = useState([]);
    const {user} = UserAuth();

    useEffect(() => {
        async function getConcertData() {
            const concertsData = await getDocs(collection(db, "concerts"));
            setConcerts(concertsData.docs.map((doc) => ({...doc.data(), id: doc.id})));
        }

        getConcertData();
    }, []);

    async function getConcertFilterData(concertFilter) {
        console.log(concertFilter);
        const genre = concertFilter.cGenre;
        const cPriceLowNumber = parseInt(concertFilter.cPriceLow);
        const cPriceHighNumber = parseInt(concertFilter.cPriceHigh);
        const newFilteredConcerts = [];
        try {
            const concertRef = collection(db, "concerts");
            if (genre.length !== 0 && genre !== "Any" && !isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("ALL FILTERS");

                const q = query(
                    concertRef,
                    where("genre", "==", genre),
                    where("price", ">=", cPriceLowNumber),
                    where("price", "<=", cPriceHighNumber)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            } else if (genre === "Any" && !isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("ALL FILTERS (ANY)");

                const q = query(concertRef, where("price", ">=", cPriceLowNumber), where("price", "<=", cPriceHighNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            } else if (genre.length !== 0 && genre !== "Any" && isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("ONLY GENRE");

                const q = query(concertRef, where("genre", "==", genre));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            } else if (genre === "Any" && isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("ONLY GENRE (ANY)");

                setFilteredConcerts(concerts);
                setFilterAvailable(false);
            } else if (genre.length !== 0 && genre !== "Any" && !isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("GENRE AND LOWPRICE");

                const q = query(concertRef, where("genre", "==", genre), where("price", ">=", cPriceLowNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            } else if (genre === "Any" && !isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("GENRE AND LOWPRICE (ANY)");

                const q = query(concertRef, where("price", ">=", cPriceLowNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            } else if (genre.length !== 0 && genre !== "Any" && isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("GENRE AND HIGHPRICE");

                const q = query(concertRef, where("genre", "==", genre), where("price", "<=", cPriceHighNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            } else if (genre === "Any" && isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("GENRE AND HIGHPRICE (ANY)");

                const q = query(concertRef, where("price", "<=", cPriceHighNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredConcerts.push(data);
                });
                setFilteredConcerts(newFilteredConcerts)
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Movcert - Concerts</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>

            <div className="h-[700px] bg-cover bg-fixed custom-img " data-aos="fade">
                <div className="flex items-center justify-center">
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black h-[140px]"/>
                    <div className="absolute h-[700px] top-0 bottom-0 right-0 left-0 bg-black/40 z-0 "/>
                    <div className="z-10 mt-[320px]">
                        <h1 className="font-bold text-center text-[50px] text-white mt-[-85px]" data-aos="fade-up">
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
                    <FilterCard screenWidth={screenWidth} onGetConcertFilterData={getConcertFilterData}/>
                </div>

                <div className="mt-8 p-4 flex justify-center items-center" data-aos="fade-up" data-aos-offset="200"
                     data-aos-once="false">
                    {filteredConcerts.length === 0 ? (
                        <ConcertCard screenWidth={screenWidth} concertsData={concerts}/>
                    ) : (
                        <FilteredConcertCard screenWidth={screenWidth} concertsData={filteredConcerts}/>
                    )}
                </div>
            </div>
        </>
    );
}

export default Concerts;
