import Image from "next/image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmptyHeartIcon from "@mui/icons-material/FavoriteBorder";
import FilledHeartIcon from "@mui/icons-material/Favorite";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { arrayUnion, updateDoc, doc, onSnapshot, getDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Link from "next/link";
import { Concert_One } from "next/font/google";

function ConcertInfo({ concertData, concertID, onBookATicketData }) {
    const [screenWidth, setScreenWidth] = useState(0);
    const [saveIcon, setSaveIcon] = useState(false);
    const [idFilter, setIdFilter] = useState([]);

    const { user } = UserAuth();

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        async function findUserSavedConcerts() {
            if (user) {
                try {
                    const querySnapshot = await getDoc(doc(db, "users", `${user?.email}`));
                    const idArray = querySnapshot.data()?.savedConcerts?.map((concert) => concert.id);
                    setIdFilter(idArray);
                    const filteredResult = idArray.includes(concertID);
                    if (filteredResult) {
                        setSaveIcon(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        findUserSavedConcerts();
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [user, concertID]);

    async function saveMovieHandler() {
        if (user?.email) {
            try {
                const concertRef = doc(db, "users", `${user?.email}`);
                await updateDoc(concertRef, {
                    savedConcerts: arrayUnion({
                        id: concertID,
                        title: concertData.title,
                        concertCover: concertData.concertCover,
                        price: concertData.price,
                        place: concertData.place,
                        totalSeats: concertData.totalSeats,
                    }),
                });
                setSaveIcon(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Please Log In to save a concert");
        }
    }

    async function deleteMovieHandler() {
        try {
            const docRef = doc(db, "users", `${user?.email}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const savedConcerts = docSnap.data().savedConcerts;
                const concertToRemove = savedConcerts.find((concert) => concert.id === concertID);
                if (concertToRemove) {
                    await updateDoc(docRef, {
                        savedConcerts: arrayRemove(concertToRemove),
                    });
                }
                setSaveIcon(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <>
            {screenWidth < 768 ? (
                <div>
                    <div className="flex justify-center items-center mb-4">
                        {concertData.concertCover ? (
                            <Image src={concertData.concertCover} width={400} height={20} alt="broken-img" />
                        ) : (
                            <p>brokenImage</p>
                        )}
                    </div>
                    <div className="text-center">
                        <h1 className="text-center text-xl mb-2">{concertData.place}</h1>
                        <hr />
                        <p className="mt-2 ">
                            <MusicNoteIcon /> <span className="text-gray-600">Genre : {concertData.genre}</span>{" "}
                        </p>
                        <p className="mt-2 ">
                            <ConfirmationNumberIcon /> <span className="text-gray-600">Total Seats : {concertData.totalSeats}</span>{" "}
                        </p>
                        <p>
                            {user?.email ? (
                                <Link href={`${concertID}` + "/checkout"}>
                                    <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                        Book A Ticket
                                    </button>
                                </Link>
                            ) : (
                                <button className=" bg-[#f7d5a6] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 cursor-not-allowed">
                                    Book A Ticket
                                </button>
                            )}

                            {!saveIcon ? (
                                <EmptyHeartIcon
                                    onClick={saveMovieHandler}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            ) : (
                                <FilledHeartIcon
                                    onClick={deleteMovieHandler}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            )}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center md:gap-[50px] lg:gap-[100px]">
                    <Image src={concertData.concertCover} width={400} height={20} alt="broken-img" />
                    <div className="text-center">
                        <h1 className="text-center text-xl mb-2">{concertData.place}</h1>
                        <hr />
                        <p className="mt-2 ">
                            <MusicNoteIcon /> <span className="text-gray-600">Genre : {concertData.genre}</span>
                        </p>
                        <p className="mt-2 ">
                            <ConfirmationNumberIcon /> <span className="text-gray-600">Total Seats : {concertData.totalSeats}</span>
                        </p>
                        <p className="mt-2 ">
                            <MoneyIcon /> <span className="text-gray-600">Price : {concertData.price}</span>
                        </p>
                        <p>
                            {user?.email ? (
                                <Link href={`${concertID}` + "/checkout"}>
                                    <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                        Book A Ticket
                                    </button>
                                </Link>
                            ) : (
                                <>
                                <button className=" bg-[#f7d5a6] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 cursor-not-allowed">
                                    Book A Ticket
                                </button>
                                </>
                            )}

                            {!saveIcon ? (
                                <EmptyHeartIcon
                                    onClick={saveMovieHandler}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            ) : (
                                <FilledHeartIcon
                                    onClick={deleteMovieHandler}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            )}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default ConcertInfo;
