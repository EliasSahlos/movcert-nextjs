import Image from "next/image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import EmptyHeartIcon from "@mui/icons-material/FavoriteBorder";
import FilledHeartIcon from "@mui/icons-material/Favorite";
import MoneyIcon from "@mui/icons-material/AttachMoney";
import { useEffect, useState } from "react";
import { UserAuth } from "@/context/AuthContext";
import { arrayUnion, updateDoc, doc, onSnapshot, getDoc, arrayRemove, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import Link from "next/link";

function MovieInfo({ movieData, movieID }) {
    const [screenWidth, setScreenWidth] = useState(0);
    const [saveIcon, setSaveIcon] = useState(false);
    const [idFilter, setIdFilter] = useState([]);

    const { user } = UserAuth();

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }

        window.addEventListener("resize", handleResize);

        async function findUserSavedMovies() {
            if (user) {
                try {
                    const querySnapshot = await getDoc(doc(db, "users", `${user?.email}`));
                    const idArray = querySnapshot.data()?.savedMovies?.map((movie) => movie.id);
                    setIdFilter(idArray);
                    const filteredResult = idArray.includes(movieID);
                    if (filteredResult) {
                        setSaveIcon(true);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }

        findUserSavedMovies();
        handleResize();

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [user, movieID]);

    async function saveMovieHandler() {
        if (user?.email) {
            try {
                const movieRef = doc(db, "users", `${user?.email}`);
                await updateDoc(movieRef, {
                    savedMovies: arrayUnion({
                        id: movieID,
                        title: movieData.title,
                        movieCover: movieData.movieCover,
                        price: movieData.price,
                        place: movieData.place,
                        totalSeats: movieData.totalSeats,
                    }),
                });
                setSaveIcon(true);
            } catch (error) {
                console.log(error);
            }
        } else {
            alert("Please Log In to save a movie");
        }
    }

    async function deleteMovieHandler() {
        try {
            const docRef = doc(db, "users", `${user?.email}`);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const savedMovies = docSnap.data().savedMovies;
                const movieToRemove = savedMovies.find((movie) => movie.id === movieID);
                if (movieToRemove) {
                    await updateDoc(docRef, {
                        savedMovies: arrayRemove(movieToRemove),
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
                        <Image src={movieData.movieCover} width={400} height={20} alt="broken-img" />
                    </div>
                    <div className="text-center">
                        <h1 className="text-center text-xl mb-2">{movieData.place}</h1>
                        <hr />
                        <p className="mt-4 text-xl">
                            {movieData.description}
                        </p>
                        <p className="mt-4 ">
                            <MusicNoteIcon /> <span className="text-gray-600">Genre : {movieData.genre}</span>{" "}
                        </p>
                        <p className="mt-2 ">
                            <ConfirmationNumberIcon /> <span className="text-gray-600">Total Seats : {movieData.totalSeats}</span>{" "}
                        </p>
                        <p>
                            {user?.email ? (
                                <Link href={`${movieID}` + "/checkout"}>
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
                    <Image src={movieData.movieCover} width={400} height={20} alt="broken-img" />
                    <div className="text-center">
                        <h1 className="text-center text-xl mb-2">{movieData.place}</h1>
                        <hr />
                        <p className="mt-4 text-xl">
                            {movieData.description}
                        </p>
                        <p className="mt-2 ">
                            <MusicNoteIcon /> <span className="text-gray-600">Genre : {movieData.genre}</span>
                        </p>
                        <p className="mt-2 ">
                            <ConfirmationNumberIcon /> <span className="text-gray-600">Total Seats : {movieData.totalSeats}</span>
                        </p>
                        <p className="mt-2 ">
                            <MoneyIcon /> <span className="text-gray-600">Price : {movieData.price}</span>
                        </p>
                        <p>
                            {user?.email ? (
                                <Link href={`${movieID}` + "/checkout"}>
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
                                    onClick={console.log("CLIKED")}
                                    className="ml-6 scale-100 cursor-pointer hover:scale-110 ease-in duration-100 "
                                />
                            ) : (
                                <FilledHeartIcon
                                    onClick={console.log("CLICKED")}
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

export default MovieInfo;
