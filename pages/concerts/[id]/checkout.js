import { doc, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { UserAuth } from "@/context/AuthContext";
import Image from "next/image";

export async function getServerSideProps(router) {
    const idObj = router.query;
    const { id } = idObj;

    return {
        props: {
            id,
        },
    };
}

function Checkout({ id }) {
    const [screenWidth, setScreenWidth] = useState(0);
    const [concertData, setConcertData] = useState([]);
    const [ticketsNumber, setTicketsNumber] = useState("");

    const { user } = UserAuth();

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        function getConcertData() {
            onSnapshot(doc(db, "concerts", id), (doc) => {
                setConcertData(doc.data());
            });
        }

        getConcertData();
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleTicketValueChange(event) {
        if (event.key < "0" || event.key > "9") {
            event.preventDefault();
        }
    }
    console.log(screenWidth);
    return (
        <>
            <Head>
                <title>Movcert - Checkout</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-cover bg-center h-screen custom-img">
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black h-[140px]" />
                <div className="absolute h-screen top-0 bottom-0 right-0 left-0 w-full bg-black/40 " />
                <div className="flex justify-center items-center text-black">
                    <div className="z-10 p-4 mt-[150px] w-[620px] h-full rounded-lg shadow-lg bg-white">
                        <h1 className="text-4xl">Checkout</h1>
                        <hr className="mt-2" />
                        {screenWidth < 768 ? (
                            <div>
                                <div className="flex justify-center items-center">
                                    <Image src={concertData.concertCover} width={250} height={20} alt="broken-img" className="mt-2" />
                                </div>
                                <div className="mt-2 text-center ">
                                    <p className="mt-2">
                                        <span className=" font-bold">Title</span> : {concertData.title}
                                    </p>
                                    <p className="mt-2">
                                        <span className=" font-bold">Place</span> : {concertData.place}
                                    </p>
                                    <p className="mt-2">
                                        <span className=" font-bold">Ticket Price</span> : {concertData.price}
                                    </p>
                                    <p className="mt-2">
                                        <span className=" font-bold">Total Seats Remaining</span> : {concertData.totalSeats}
                                    </p>
                                    <p className="mt-8">
                                        <span className="text-lg ">Tickets</span> :
                                        <input
                                            className=" ml-4 border-2 border-[##ced4da] h-[30px]  p-2 w-[80px] outline-none rounded shadow-sm focus:border-[#f3c07a] "
                                            type="number"
                                            id="ticketNumber"
                                            min="1"
                                            max="50"
                                            value={ticketsNumber}
                                            onKeyDown={handleTicketValueChange}
                                            onChange={(e) => setTicketsNumber(e.target.value)}
                                        />
                                    </p>
                                    <p className="text-lg mt-6">Final Price</p>
                                    <p>
                                        <span className="text-3xl font-bold">{concertData.price * ticketsNumber}</span> €
                                    </p>
                                    <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                        Book A Ticket
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-2">
                                <div>
                                    <Image src={concertData.concertCover} width={270} height={20} alt="broken-img" className="mt-2" />
                                    <p className="mt-8">
                                        <span className="text-lg ">Tickets</span> :
                                        <input
                                            className=" ml-[10px] border-2 border-[##ced4da] h-[30px]  p-2 w-[80px] outline-none rounded shadow-sm focus:border-[#f3c07a] "
                                            type="number"
                                            id="ticketNumber"
                                            min="1"
                                            max="50"
                                            value={ticketsNumber}
                                            onKeyDown={handleTicketValueChange}
                                            onChange={(e) => setTicketsNumber(e.target.value)}
                                        />
                                    </p>
                                    <p className="text-lg mt-6">Final Price</p>
                                    <p>
                                        <span className="text-3xl font-bold">{concertData.price * ticketsNumber}</span> €
                                    </p>
                                </div>
                                <div className="mt-2 ">
                                    <p className="mt-4">
                                        <span className="text-lg font-bold">Title</span> : {concertData.title}
                                    </p>
                                    <p className="mt-4">
                                        <span className="text-lg font-bold">Place</span> : {concertData.place}
                                    </p>
                                    <p className="mt-4">
                                        <span className="text-lg font-bold">Ticket Price</span> : {concertData.price}
                                    </p>
                                    <p className="mt-4">
                                        <span className="text-lg font-bold">Total Seats Remaining</span> : {concertData.totalSeats}
                                    </p>
                                    <button className="mt-[170px] ml-[55px] bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                        Book A Ticket
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
