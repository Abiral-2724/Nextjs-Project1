"use client"

import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react"

export default function Verifyemailpage() {
    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post('/api/users/verifyemail', { token });
            setVerified(true);
        } catch (error: unknown) {
            setError(true);
            console.log(error.response.data)
        }
    }

    useEffect(() => {
        const urlToken = window.location.search.split("=")[1];
        setToken(urlToken || "");
    }, [])

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        }
    }, [token])

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify your email</h1>
                    <p className="text-sm text-gray-500">
                        {token ? "Verifying your email address..." : "No verification token found"}
                    </p>
                </div>

                {verified && (
                    <div className="text-center space-y-4">
                        <div className="rounded-full bg-green-100 p-3 w-16 h-16 mx-auto">
                            <svg
                                className="w-10 h-10 text-green-500 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Email verified successfully!</h2>
                        <Link 
                            href="/login"
                            className="inline-block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                        >
                            Continue to Login
                        </Link>
                    </div>
                )}

                {error && (
                    <div className="text-center space-y-4">
                        <div className="rounded-full bg-red-100 p-3 w-16 h-16 mx-auto">
                            <svg
                                className="w-10 h-10 text-red-500 mx-auto"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </div>
                        <h2 className="text-xl font-semibold text-gray-900">Verification failed</h2>
                        <p className="text-sm text-gray-500">
                            There was an error verifying your email. Please try again or contact support.
                        </p>
                        <Link 
                            href="/"
                            className="inline-block w-full text-center bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-md transition duration-150 ease-in-out"
                        >
                            Return to Home
                        </Link>
                    </div>
                )}

                {!verified && !error && token && (
                    <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                )}
            </div>
        </div>
    )
}