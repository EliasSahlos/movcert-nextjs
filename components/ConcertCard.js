import Image from "next/image";
import { useState } from "react";
import { Transition } from "@headlessui/react";
import Link from "next/link";

function ConcertCard({ screenWidth, concertsData }) {
    
    
    return (
        <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" data-aos="fade-up">
                {concertsData?.map((concert) => (
                    <div key={concert.id} data-aos="fade-up">
                        <div className="mb-2" data-aos="fade-up">
                            <Link href={'/concerts/' + concert.id}>
                            <Image
                                src={concert.concertCover}
                                width={400}
                                height={20}
                                alt="broken-img"
                                className="rounded h-auto max-w-full shadow-xl scale-100 hover:scale-105 ease-in duration-100"
                            />
                            <h1 className="text-center mt-4" data-aos="fade-up">{concert.title}</h1>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default ConcertCard;