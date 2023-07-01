import { useState } from "react";

function FilterCard({ screenWidth, onGetConcertFilterData: onGetMovieFilterData }) {
    const [cTitle, setCTitle] = useState("");
    const [cGenre, setCGenre] = useState("Any");
    const [cPriceLow, setCPriceLow] = useState("");
    const [cPriceHigh, setCPriceHigh] = useState("");

    function handleFilterSubmit(e) {
        e.preventDefault();
        onGetMovieFilterData({ cGenre: cGenre, cPriceLow: cPriceLow, cPriceHigh: cPriceHigh });
    }

    function handlePriceValueKey(event) {
        const regex = /^[0-9]+$/;
        if (!regex.test(event.key) && event.key !== "Backspace") {
            event.preventDefault();
        }
    }

    return (
        <>
            <form onSubmit={handleFilterSubmit}>
                {screenWidth < 768 ? (
                    <div className="flex justify-center items-center">
                        <div className=" block w-[550px] p-8 mt-[150px] border rounded-lg shadow-md bg-white z-10 abovesm:w-[550px] md:grid grid-cols-4 gap-4 w-[800px]">
                            <p className="mb-2 text-[16px] font-bold text-black">Movie Genre</p>
                            <select
                                className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a]"
                                name="cGenre"
                                value={cGenre}
                                onChange={(e) => setCGenre(e.target.value)}
                            >
                                <option value="Any">Any</option>
                                <option value="Pop">Adventure</option>
                                <option value="Hip-Hop">Drama</option>
                                <option value="Rock">Comedy</option>
                                <option value="Metal">Documentary</option>
                            </select>
                            <p className="mb-2 mt-2 text-[16px] font-bold text-black">Price - Low</p>
                            <input
                                type="text"
                                name="Search"
                                value={cPriceLow}
                                onKeyDown={handlePriceValueKey}
                                onChange={(e) => setCPriceLow(e.target.value)}
                                placeholder="1 $"
                                className=" border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                            />
                            <p className="mb-2 mt-2 text-[16px] font-bold text-black">Price - High</p>
                            <input
                                type="text"
                                name="Search"
                                value={cPriceHigh}
                                onKeyDown={handlePriceValueKey}
                                onChange={(e) => setCPriceHigh(e.target.value)}
                                placeholder="10+ $"
                                className="border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                            />
                            <div className="flex justify-center items-center mt-6">
                                <button className=" bg-[#ffba5a] text-white w-[120px] h-[50px] rounded-full shadow-md ">Set Filters</button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <div className="w-[1200px] p-8 mt-[150px] border rounded-lg shadow-md bg-white z-10 grid grid-cols-6 gap-4 w-[800px]">
                            <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Movie Genre</p>
                            <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Price - Low</p>
                            <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Price - High</p>
                            <select
                                className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a]"
                                name="cGenre"
                                value={cGenre}
                                onChange={(e) => setCGenre(e.target.value)}
                            >
                                <option value="Any">Any</option>
                                <option value="Pop">Adventure</option>
                                <option value="Hip-Hop">Drama</option>
                                <option value="Rock">Comedy</option>
                                <option value="Metal">Documentary</option>
                            </select>
                            <input
                                type="text"
                                name="Search"
                                placeholder="1 $"
                                value={cPriceLow}
                                onKeyDown={handlePriceValueKey}
                                onChange={(e) => setCPriceLow(e.target.value)}
                                className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                            />
                            <input
                                type="text"
                                name="Search"
                                placeholder="100+ $"
                                value={cPriceHigh}
                                onKeyDown={handlePriceValueKey}
                                onChange={(e) => setCPriceHigh(e.target.value)}
                                className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                            />
                            <div className="relative ml-[290px] mt-4 ">
                                <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] rounded-full">Set Filters</button>
                            </div>
                        </div>
                    </div>
                )}
            </form>
        </>
    );
}

export default FilterCard;
