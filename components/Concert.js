import Image from "next/image";

function Concert({ screenWidth }) {
    return (
        <>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-3 gap-3 lg:gap-6">
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/taylor-swift/images/5/5c/Midnights.jpeg/revision/latest?cb=20221010181526"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                    <h1 className="text-center font-bold text-">Title1</h1>
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
                <div>
                    <Image
                        src="https://static.wikia.nocookie.net/arianagrande/images/4/43/Positions_%E2%80%93_Limited_Edition_Cover_2.jpg"
                        width={400}
                        height={20}
                        alt="broken-img"
                        className="rounded h-auto max-w-full"
                    />
                </div>
            </div>
        </>
    );
}

export default Concert;
