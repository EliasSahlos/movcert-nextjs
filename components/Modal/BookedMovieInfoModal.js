import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import FestivalIcon from "@mui/icons-material/Festival";
import TicketIcon from "@mui/icons-material/ConfirmationNumber";


function BookedMovieInfoModal({movie, onGetOverlayData }) {

    function handleCloseIcon() {
        onGetOverlayData();
    }

    return (
        <>
            <div className="fixed inset-0 bg-black bg-black/60 flex items-center justify-center z-50">
                <div className="bg-white p-4 w-[600px] h-[460px] rounded shadow-lg" data-aos="fade-up">
                    <div className="flex justify-between">
                        <h1>{movie.title}</h1>
                        <CloseIcon
                            className="cursor-pointer scale-100 hover:scale-110 ease-in duration-100 hover:text-red-500"
                            onClick={handleCloseIcon}
                        />
                    </div>
                    <hr className="border-[1px] border-[#ffba5a] mt-2" />
                    <div className="flex justify-center items-center mt-2">
                        <Image
                            src={movie.movieCover}
                            width={120}
                            height={20}
                            alt="broken-img"
                            className="rounded h-auto max-w-full shadow-xl"
                        />
                    </div>
                    <div className="p-2">
                        <p className="mt-4">
                            <FestivalIcon className="mr-4" />
                            {movie.uid}
                        </p>
                        <p className="mt-4">
                            <FestivalIcon className="mr-4" />
                            {movie.place}
                        </p>
                        <p className="mt-4">
                            <TicketIcon className="mr-4" />
                            Number Of Tickets: {movie.numberOfTickets}
                        </p>
                        <p className="mt-4 text-center">
                            Final Price: <span className="text-2xl font-bold">{movie.finalPrice} </span>$
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default BookedMovieInfoModal;