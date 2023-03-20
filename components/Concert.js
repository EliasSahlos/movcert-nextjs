import Image from "next/image";
import { useState } from "react";
import { Transition } from "@headlessui/react";

function Concert({ screenWidth }) {
    
    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 gap-4 lg:gap-6">
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/edsheeran/images/9/99/3rd_album.jpg/revision/latest?cb=20170117201309"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                    <h1 className="text-center mt-2">Ed Sheeran : Divide Tour</h1>
                </div>
                <div className="mb-2">
                    <Image
                        src="https://static.wikia.nocookie.net/taylor-swift/images/5/5c/Midnights.jpeg/revision/latest?cb=20221010181526"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                    <h1 className="text-center mt-2">Taylor Swift : Midnight Tour</h1>
                </div>
                <div >
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                    <h1 className="text-center mt-2">Ariana Grande : Positions Tour</h1>
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/the-weeknd/images/3/39/The_Weeknd_-_Starboy.png/revision/latest?cb=20220403144136"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                       <h1 className="text-center mt-2">The Weeknd : Starboy Tour</h1>
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/e__/images/c/c1/Eminem_recovery_album_cover_2_big.png/revision/latest?cb=20131215190445&path-prefix=eminem"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                       <h1 className="text-center mt-2">Eminem : Recovery Tour</h1>
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/madonna/images/c/cb/MDNA_standard.jpg/revision/latest?cb=20190428103744"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                       <h1 className="text-center mt-2">Madonna : MDNA Tour</h1>
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/ladygaga/images/9/92/Chromatica_artwork.jpg/revision/latest?cb=20200406202936"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                    <h1 className="text-center mt-2">Lady Gaga : Chromatica Tour</h1>
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/metallica/images/1/1b/Reload_%28album%29.jpg/revision/latest?cb=20120605074500"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full shadow-xl"
                    />
                     <h1 className="text-center mt-2">Metallica : Reload Tour</h1>
                </div>
            </div>
        </>
    );
}

export default Concert;
