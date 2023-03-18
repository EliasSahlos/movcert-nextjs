import FilterCard from "@/components/FilterCard";
import HeaderBar from "@/components/HeaderBar";
import Head from "next/head";
import { useEffect, useState } from "react";

function Concerts() {
   
    return (
        <>
            <Head>
                <title>Movcert</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-[700px] bg-cover custom-img">
                <HeaderBar />
                <div className="flex items-center justify-center mt-[300px]">
                    <div className="absolute h-[700px] top-0 bottom-0 right-0 left-0 bg-black/40 z-0 " />
                    <div className="z-10">
                        <h1 className="font-bold text-center text-[40px] text-white mt-[-85px]">Concerts</h1>
                        <div className="scroll-downs">
                            <div className="mousey">
                                <div className="scroller"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <FilterCard/>
                
            </div>
        </>
    );
}

export default Concerts;
