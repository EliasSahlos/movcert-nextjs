import Image from "next/image";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

function ConcertCard({ screenWidth, concertsData }) {
    
    
    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 gap-4 lg:gap-6">
                {concertsData.map((concert) => (
                    <div key={concert.id}>
                        <div className="mb-2">
                            <Link href={'/concerts/' + concert.id}>
                            <Image
                                src={concert.concertCover}
                                width={400}
                                height={20}
                                alt="broken-img"
                                className="rounded h-auto max-w-full shadow-xl scale-100 hover:scale-105 ease-in duration-100"
                            />
                            <h1 className="text-center mt-4">{concert.title}</h1>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ConcertCard;