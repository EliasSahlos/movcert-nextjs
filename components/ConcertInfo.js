import Image from "next/image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmptyHeartIcon from "@mui/icons-material/FavoriteBorder";
import FilledHeartIcon from "@mui/icons-material/Favorite";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { arrayUnion, updateDoc, doc, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

function ConcertInfo({ concertData, concertID }) {
    const [screenWidth, setScreenWidth] = useState(0);
    const [saveIcon, setSaveIcon] = useState(false);

    const { user } = UserAuth();
    const currentUser = auth.currentUser;
    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);

        async function findSavedConcert() {
            const concertIdArr = []
            const querySnapshot = await getDocs(collection(db, "users"));
            querySnapshot.forEach((doc) => {
                const datatest = doc.data().savedConcerts;
                datatest.forEach((concert) => {
                    concertIdArr.push(concert.id)
                })
                const filteredResult = concertIdArr.includes(concertID)
                if(filteredResult){
                    setSaveIcon(true)
                }
            });
        }

        handleResize();
        findSavedConcert();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    async function saveIconHandler() {
        if (user?.email) {
            setSaveIcon(!saveIcon);
            const userRef = doc(db, "users", `${user?.email}`);
            await updateDoc(userRef, {
                savedConcerts: arrayUnion({
                    id: concertID,
                    title: concertData.title,
                    img: concertData.concertCover,
                }),
            });
        } else {
            alert("Please Log In to save a concert");
        }
    }

    return (
        <>
            {screenWidth < 768 ? (
                <div>
                    <div className="flex justify-center items-center mb-4">
                        <Image src={concertData.concertCover} width={400} height={20} alt="broken-img" />
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
                            <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                Book A Ticket
                            </button>
                            {!saveIcon ? (
                                <EmptyHeartIcon
                                    onClick={saveIconHandler}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            ) : (
                                <FilledHeartIcon
                                    onClick={saveIconHandler}
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
                            <MusicNoteIcon /> <span className="text-gray-600">Genre : {concertData.genre}</span>{" "}
                        </p>
                        <p className="mt-2 ">
                            <ConfirmationNumberIcon /> <span className="text-gray-600">Total Seats : {concertData.totalSeats}</span>{" "}
                        </p>
                        <p>
                            <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] mt-6 rounded-full shadow-md scale-100 hover:scale-105 ease-in duration-100 ">
                                Book A Ticket
                            </button>
                            {!saveIcon ? (
                                <EmptyHeartIcon
                                    onClick={saveIconHandler}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            ) : (
                                <FilledHeartIcon
                                    onClick={saveIconHandler}
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
