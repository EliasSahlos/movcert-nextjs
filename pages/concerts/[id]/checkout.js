import { doc, onSnapshot } from "firebase/firestore";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { db } from "../../../firebase/firebase";
import { UserAuth } from "@/context/AuthContext";

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
    const [concertData, setConcertData] = useState([]);
    const [ticketValue, setTicketValue] = useState("");
  
    

    useEffect(() => {
        function getConcertData() {
            onSnapshot(doc(db, "concerts", id), (doc) => {
                setConcertData(doc.data());
            });
        }

        getConcertData();
    }, []);

      function handleTicketValueChange(event){
        if (event.key < '0' || event.key > '9') {
            event.preventDefault();
          }
      }

      
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
                <div className="absolute h-screen top-0 bottom-0 right-0 left-0 w-full bg-black/40 z-0 " />
                <div className="flex justify-center items-center text-black">
                    <div className="z-10 p-4 mt-[150px] w-[600px] h-[500px] rounded-lg shadow-lg bg-white">
                        <h1 className="text-4xl">Checkout</h1>
                        <hr className="mt-2" />
                        <p className="mt-4 ">
                            <span className="text-lg font-bold">Title</span> : {concertData.title}
                        </p>
                        <p className="mt-4 ">
                            <span className="text-lg font-bold">Place</span> : {concertData.place}
                        </p>
                        <p className="mt-4 ">
                            <span className="text-lg font-bold">Total Seats Remaining</span> : {concertData.totalSeats}{" "}
                        </p>
                        <div>
                            <p className="mt-[150px]">
                                <span className="text-lg font-bold">Tickets</span> :
                                <input
                                    className=" ml-[10px] border-2 border-[##ced4da] h-[30px]  p-2 w-[80px] outline-none rounded shadow-sm focus:border-[#f3c07a] "
                                    type="number"
                                    id="ticketNumber"
                                    min="1"
                                    max="50"
                                    value={ticketValue}
                                    onKeyDown={handleTicketValueChange}
                                    onChange={(e) => setTicketValue(e.target.value)}
                                />
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
