import Image from "next/image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useEffect, useState } from "react";
function ConcertInfo({ concertData }) {
    const [screenWidth, setScreenWidth] = useState(0);

    useEffect(() => {
        function handleResize() {
            setScreenWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);
    console.log(screenWidth);
    return (
        <>
            {screenWidth < 768 ? (
                <div>
                    <div className="flex justify-center items-center mb-4">
                        <Image src={concertData.concertCover} width={400} height={20} />
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
                        </p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center md:gap-[50px] lg:gap-[100px]">
                        <Image src={concertData.concertCover} width={400} height={20} />
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
                        </p>
                    </div>
                </div>
            )}
        </>
    );
}

export default ConcertInfo;
