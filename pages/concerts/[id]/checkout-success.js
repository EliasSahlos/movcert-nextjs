import Head from "next/head";
import Link from "next/link";

function CheckoutSuccess() {
    return (
        <>
            <Head>
                <title>Movcert - Checkout Success</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="bg-cover bg-center h-screen custom-img">
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black h-[140px]" />
                <div className="absolute h-screen top-0 bottom-0 right-0 left-0 w-full bg-black/40 " />
                <div className="flex justify-center items-center text-black">
                    <div className="z-10 p-4 mt-[150px] w-[620px] h-[full] rounded-lg shadow-lg bg-white">
                        <div class="bg-[#d4edda] border-[#38b2ac] border-2 text-[#357042] px-4 py-3 rounded relative" role="alert">
                            <strong class="font-bold">Success! </strong>
                            <span class="block sm:inline">Your checkout has been completed. Thank you for using Movcert </span>
                            <p className="mt-4">
                                Go back to <Link href={"/"}><span className="underline font-bold">homepage</span></Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CheckoutSuccess;
