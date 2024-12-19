"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { UserPlus, Mail, Lock, User } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        username: "",
    });
    const [loading, setLoading] = useState(false);
    const [buttonDisable, setButtonDisable] = useState(false);

    const onSignup = async () => {
        try {
            if (!user.email || !user.password || !user.username) {
                toast.error("All fields are required!");
                return;
            }
            setLoading(true);

            const response = await axios.post("/api/users/signup", user);
            
            if (response.data.success) {
                toast.success("Signup successful!");
                router.push("/login");
            }
        } catch (error: any) {
            if (error.response) {
                const errorMessage = error.response.data.error;
                if (errorMessage === "User already exists") {
                    toast.error("An account with this email already exists");
                } else if (errorMessage.includes("password")) {
                    toast.error("Password must be at least 6 characters long");
                } else if (errorMessage.includes("username")) {
                    toast.error("Username must be at least 3 characters long");
                } else {
                    toast.error(errorMessage || "Signup failed");
                }
            } else {
                toast.error("Something went wrong. Please try again!");
            }
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setButtonDisable(!(user.email.length > 0 && 
                          user.password.length > 0 && 
                          user.username.length > 0));
    }, [user]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <div className="flex justify-center">
                        <UserPlus className="h-12 w-12 text-blue-500" />
                    </div>
                    <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
                        {loading ? "Creating Account..." : "Create Account"}
                    </h2>
                    <p className="mt-2 text-sm text-gray-600">
                        Join us today and start your journey
                    </p>
                </div>

                <div className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div className="relative">
                            <label htmlFor="username" className="sr-only">Username</label>
                            <div className="flex items-center">
                                <User className="absolute left-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="username"
                                    type="text"
                                    value={user.username}
                                    placeholder="Username"
                                    onChange={(e) => setUser({...user, username: e.target.value})}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="email" className="sr-only">Email</label>
                            <div className="flex items-center">
                                <Mail className="absolute left-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="email"
                                    type="email"
                                    value={user.email}
                                    placeholder="Email address"
                                    onChange={(e) => setUser({...user, email: e.target.value})}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label htmlFor="password" className="sr-only">Password</label>
                            <div className="flex items-center">
                                <Lock className="absolute left-3 h-5 w-5 text-gray-400" />
                                <input
                                    id="password"
                                    type="password"
                                    value={user.password}
                                    placeholder="Password"
                                    onChange={(e) => setUser({...user, password: e.target.value})}
                                    className="pl-10 w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={onSignup}
                        disabled={buttonDisable || loading}
                        className={`w-full flex justify-center py-3 px-4 rounded-lg text-sm font-semibold transition-all duration-200 ease-in-out
                            ${buttonDisable || loading 
                                ? 'bg-gray-300 cursor-not-allowed' 
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'}`}
                    >
                        {loading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating account...
                            </div>
                        ) : buttonDisable ? "Sign up" : "Sign up"}
                    </button>

                    <div className="text-center text-sm">
                        <p className="text-gray-600">
                            Already have an account?{" "}
                            <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500 transition-colors">
                                Login here
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}