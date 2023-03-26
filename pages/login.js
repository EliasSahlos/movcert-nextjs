import Head from "next/head";
import Link from "next/link";
import { UserAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { useState } from "react";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { user, logIn } = UserAuth();
    let router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        try {
            await logIn(email, password);
            router.push("/");
        } catch (error) {
            console.log(error);
            setError(error.message);
        }
    }
    
    return (
        <>
            <Head>
                <title>Movcert - Login</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="h-screen bg-cover custom-img" data-aos="fade">
                <div className="flex items-center justify-center">
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-black h-[140px]" />
                    <div className="absolute top-0 bottom-0 right-0 left-0 bg-black/40 h-screen" />
                    <div
                        className="block w-[500px] p-8 mt-[150px] border rounded-lg shadow-md bg-white z-10 abovesm:w-[550px]"
                        data-aos="fade-up"
                    >
                        <h1 className="text-3xl text-black pb-4">Login</h1>
                        {error ? (
                            <div class="bg-red-100 border border-red-400 text-red-700  px-4 py-3 rounded relative" role="alert">
                                <strong class="font-bold">Error!</strong>
                                <span class="block sm:inline"> {error}</span>
                                <span class="absolute top-0 bottom-0 right-0 px-4 py-3">
                                    <svg
                                        class="fill-current h-6 w-6 text-red-500"
                                        role="button"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <title>Close</title>
                                        <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                                    </svg>
                                </span>
                            </div>
                        ) : null}
                        <form onSubmit={handleSubmit}>
                            <input
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="Email"
                                className=" my-4 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                                autoComplete="email"
                            />
                            <input
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="Password"
                                className="my-2 border-2 border-[##ced4da] h-[50px] p-2 w-full outline-none rounded shadow-sm focus:border-[#f3c07a] "
                                autoComplete="current-password"
                            />
                            <div className="flex justify-between items-center mt-4 text-sm text-gray-600">
                                <p>
                                    <input className="mr-2" type="checkbox" />
                                    Remember Me
                                </p>
                                <p>Need Help?</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <button className=" bg-[#ffba5a] text-white w-[120px] h-[50px] mt-6 rounded-full shadow-md ">Login</button>
                            </div>
                            <div>
                                <p className="mt-6 text-sm text-right text-gray-600">
                                    Dont have an account?{" "}
                                    <span className="text-[#ffba5a] font-bold">
                                        <Link href="/register">Register</Link>
                                    </span>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;