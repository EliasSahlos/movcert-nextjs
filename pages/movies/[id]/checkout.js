import { arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";
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
    const [movieData, setMovieData] = useState([]);
    const [ticketsNumber, setTicketsNumber] = useState("");

    const { user } = UserAuth();
    let router = useRouter();

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        function getMovieData() {
            onSnapshot(doc(db, "movies", id), (doc) => {
                setMovieData(doc.data());
            });
        }

        getMovieData();
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    function handleTicketValueChange(event) {
        const regex = /^[0-9]+$/;
        if (!regex.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    }

    async function handleBookingSubmit(e) {
        e.preventDefault();
        try {
            const movieRef = doc(db, "users", `${user?.email}`);
            await updateDoc(movieRef, {
                bookedMovies: arrayUnion({
                    id: id,
                    title: movieData.title,
                    movieCover: movieData.movieCover,
                    place: movieData.place,
                    numberOfTickets: ticketsNumber,
                    finalPrice: movieData.price * ticketsNumber,
                }),
            });
            router.push("/movies/" + id + "/checkout-success");
        } catch (error) {
            console.log(error);
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
                <div className="absolute h-screen top-0 bottom-0 right-0 left-0 w-full bg-black/40 " />
                <div className="flex justify-center items-center text-black">
                    <div className="z-10 p-4 mt-[150px] w-[620px] h-full rounded-lg shadow-lg bg-white">
                        <h1 className="text-4xl">Checkout</h1>
                        <hr className="mt-2" />
                        {screenWidth < 768 ? (
                            <>
                                <form onSubmit={handleBookingSubmit}>
                                    {user?.email ? (
                                        <>
                                            <div>
                                                <div className="flex justify-center items-center">
                                                    <Image
                                                        src={movieData.movieCover}
                                                        width={250}
                                                        height={20}
                                                        alt="broken-img"
                                                        className="mt-2"
                                                    />
                                                </div>
                                                <div className="mt-2 text-center ">
                                                    <p className="mt-2">
                                                        <span className=" font-bold">Title</span> : {movieData.title}
                                                    </p>
                                                    <p className="mt-2">
                                                        <span className=" font-bold">Place</span> : {movieData.place}
                                                    </p>
                                                    <p className="mt-2">
                                                        <span className=" font-bold">Ticket Price</span> : {movieData.price}
                                                    </p>
                                                    <p className="mt-2">
                                                        <span className=" font-bold">Total Seats Remaining</span> : {movieData.totalSeats}
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
                                                        <span className="text-3xl font-bold">{movieData.price * ticketsNumber}</span> €
                                                    </p>
                                                    <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                                        Book A Ticket
                                                    </button>
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            <strong class="font-bold">Error!</strong>
                                            <span class="block sm:inline">Please Log In to book a ticket</span>
                                        </div>
                                    )}
                                </form>
                            </>
                        ) : (
                            <>
                                <form onSubmit={handleBookingSubmit}>
                                    {user?.email ? (
                                        <>
                                            <div className="grid grid-cols-2 gap-2">
                                                <div>
                                                    <Image
                                                        src={movieData.movieCover}
                                                        width={200}
                                                        height={20}
                                                        alt="broken-img"
                                                        className="mt-2"
                                                    />
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
                                                        <span className="text-3xl font-bold">{movieData.price * ticketsNumber}</span> €
                                                    </p>
                                                </div>
                                                <div className="mt-2 ">
                                                    <p className="mt-4">
                                                        <span className="text-lg font-bold">Title</span> : {movieData.title}
                                                    </p>
                                                    <p className="mt-4">
                                                        <span className="text-lg font-bold">Place</span> : {movieData.place}
                                                    </p>
                                                    <p className="mt-4">
                                                        <span className="text-lg font-bold">Ticket Price</span> : {movieData.price}
                                                    </p>
                                                    <p className="mt-4">
                                                        <span className="text-lg font-bold">Total Seats Remaining</span> :{" "}
                                                        {movieData.totalSeats}
                                                    </p>
                                                    {user?.email ? (
                                                        <button className="mt-[160px] ml-[48px] bg-[#ffba5a] text-white w-[140px] h-[50px] rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                                            Book A Ticket
                                                        </button>
                                                    ) : (
                                                        <button className="mt-6 ml-[48px] bg-[#f7d5a6] text-white w-[140px] h-[50px] rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 cursor-not-allowed">
                                                            Book A Ticket
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <div class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                                            <strong class="font-bold">Error! </strong>
                                            <span class="block sm:inline">Please Log In to book a ticket</span>
                                        </div>
                                    )}
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Checkout;
