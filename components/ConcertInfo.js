import Image from "next/image";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import { useEffect, useState } from "react";
function ConcertInfo({ concertData }) {
    const [screenWidth,setScreenWidth] = useState(0)

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
                </div>
            </div>
        </>
    );
}

export default ConcertInfo;
