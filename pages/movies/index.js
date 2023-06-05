import Head from "next/head";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { UserAuth } from "@/context/AuthContext";
import FilterCard from "@/components/Movies/Filters";
import MovieCard from "@/components/Movies/MovieCard";
import FilteredMovieCard from "@/components/Movies/FilteredMovieCard";

function Movies({ screenWidth }) {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const { user } = UserAuth();

    useEffect(() => {
        async function getMovieData() {
            const moviesData = await getDocs(collection(db, "movies"));
            setMovies(moviesData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getMovieData();
    }, []);
    
    async function getMovieFilterData(movieFilter) {
        console.log(movieFilter);
        const genre = movieFilter.cGenre;
        const cPriceLowNumber = parseInt(movieFilter.cPriceLow);
        const cPriceHighNumber = parseInt(movieFilter.cPriceHigh);
        const newFilteredMovies = [];
        try {
            const movieRef = collection(db, "movies");
            if (genre.length !== 0 && genre !== "Any" && !isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("ALL FILTERS");

                const q = query(
                    movieRef,
                    where("genre", "==", genre),
                    where("price", ">=", cPriceLowNumber),
                    where("price", "<=", cPriceHighNumber)
                );
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            } else if (genre === "Any" && !isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("ALL FILTERS (ANY)");

                const q = query(movieRef, where("price", ">=", cPriceLowNumber), where("price", "<=", cPriceHighNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            } else if (genre.length !== 0 && genre !== "Any" && isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("ONLY GENRE");

                const q = query(movieRef, where("genre", "==", genre));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            } else if (genre === "Any" && isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("ONLY GENRE (ANY)");

                setFilteredMovies(movies);
                setFilterAvailable(false);
            } else if (genre.length !== 0 && genre !== "Any" && !isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("GENRE AND LOWPRICE");

                const q = query(movieRef, where("genre", "==", genre), where("price", ">=", cPriceLowNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            } else if (genre === "Any" && !isNaN(cPriceLowNumber) && isNaN(cPriceHighNumber)) {
                console.log("GENRE AND LOWPRICE (ANY)");

                const q = query(movieRef, where("price", ">=", cPriceLowNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            } else if (genre.length !== 0 && genre !== "Any" && isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("GENRE AND HIGHPRICE");

                const q = query(movieRef, where("genre", "==", genre), where("price", "<=", cPriceHighNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            } else if (genre === "Any" && isNaN(cPriceLowNumber) && !isNaN(cPriceHighNumber)) {
                console.log("GENRE AND HIGHPRICE (ANY)");

                const q = query(movieRef, where("price", "<=", cPriceHighNumber));
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    let data = doc.data();
                    data.id = doc.id;
                    newFilteredMovies.push(data);
                });
                setFilteredMovies(newFilteredMovies);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Head>
                <title>Movcert - Movies</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div className="h-[700px] bg-cover bg-fixed custom-img " data-aos="fade">
                <div className="flex items-center justify-center">
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black h-[140px]" />
                    <div className="absolute h-[700px] top-0 bottom-0 right-0 left-0 bg-black/40 z-0 " />
                    <div className="z-10 mt-[320px]">
                        <h1 className="font-bold text-center text-[50px] text-white mt-[-85px]" data-aos="fade-up">
                            Movies
                        </h1>
                        <div className="scroll-downs" data-aos="fade-up">
                            <div className="absolute mousey mt-[40px]">
                                <div className="scroller"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div data-aos="fade-up" data-aos-offset="200" data-aos-once="false">
                    <FilterCard screenWidth={screenWidth} onGetMovieFilterData={getMovieFilterData} />
                </div>

                <div className="mt-8 p-4 flex justify-center items-center" data-aos="fade-up" data-aos-offset="200" data-aos-once="false">
                    {filteredMovies.length === 0 ? (
                        <MovieCard screenWidth={screenWidth} moviesData={movies} />
                    ) : (
                        <FilteredMovieCard screenWidth={screenWidth} moviesData={filteredMovies} />
                    )}
                </div>
            </div>
        </>
    );
}

export default Movies;
