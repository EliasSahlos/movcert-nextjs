
function FilterCard({screenWidth}) {
    
    console.log(screenWidth);
    return (
        <>
            {screenWidth < 768 ? (
                <div className="flex justify-center items-center">
                    <div className=" block w-[550px] p-8 mt-[150px] border rounded-lg shadow-md bg-white z-10 abovesm:w-[550px] md:grid grid-cols-4 gap-4 w-[800px]">
                        <p className="mb-2 text-[16px] font-bold text-black">Concert Title</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className=" border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <p className="mb-2 text-[16px] font-bold text-black">Music Genre</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className=" border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <p className="mb-2 text-[16px] font-bold text-black">Price - Low</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className=" border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <p className="mb-2 text-[16px] font-bold text-black">Price - High</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <div className="flex justify-center items-center mt-6">
                            <button className=" bg-[#ffba5a] text-white w-[120px] h-[50px] rounded-full shadow-md ">Set Filters </button>
                        </div>
                    </div>
                </div>
            ) : screenWidth < 1024 ? (
                <div className="flex justify-center items-center">
                    <div className=" block w-[550px] p-8 mt-[150px] border rounded-lg shadow-md bg-white z-10 grid grid-cols-4 gap-4 w-[800px]">
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Concert Title</p>
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Music Genre</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />

                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Price - Low</p>
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Price - High</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <div className="relative ml-[280px] mt-4 ">
                            <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] rounded-full ">Set Filters </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center">
                    <div className=" block w-[1200px] p-8 mt-[150px] border rounded-lg shadow-md bg-white z-10 grid grid-cols-8 gap-4 w-[800px]">
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Concert Title</p>
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Music Genre</p>
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Price - Low</p>
                        <p className="col-span-2 mb-2 text-[16px] font-bold text-black">Price - High</p>
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <input
                            type="text"
                            name="Search"
                            id="cTitle"
                            className="col-span-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                        />
                        <div className="relative ml-[290px] mt-4 ">
                            <button className=" bg-[#ffba5a] text-white w-[140px] h-[50px] rounded-full">Set Filters </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default FilterCard;
