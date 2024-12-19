"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { User, LogOut, Info } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();
    const [data, setData] = useState('nothing');

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            toast.success("Logged out successfully");
            router.push('/login');
        } catch (error: unknown) {
            toast.error("Error while logging out"+error);
        }
    }

    const getUserDetails = async () => {
        try {
            const res = await axios.get('/api/users/me');
            console.log(res.data);
            setData(res.data.data._id);
        } catch (error : unknown) {
            toast.error("Failed to fetch user details"+error);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-4xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-3">
                            <User className="w-8 h-8 text-blue-600" />
                            <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
                        </div>
                        <button 
                            onClick={logout} 
                            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>

                    <hr className="border-gray-200 mb-6" />

                    {/* User ID Section */}
                    <div className="mb-8 p-6 bg-gray-50 rounded-lg">
                        <h2 className="text-lg font-semibold text-gray-700 mb-4">User Information</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-600">User ID:</span>
                            {data === 'nothing' ? (
                                <span className="text-gray-400 italic">Not fetched yet</span>
                            ) : (
                                <Link 
                                    href={`/profile/${data}`}
                                    className="text-blue-600 hover:text-blue-700 hover:underline"
                                >
                                    {data}
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex justify-center">
                        <button 
                            onClick={getUserDetails}
                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Info className="w-4 h-4" />
                            Get User Details
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}