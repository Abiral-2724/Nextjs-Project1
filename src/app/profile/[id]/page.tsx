"use client"

import { User, Mail, Calendar, MapPin } from 'lucide-react';

// Next.js 13 automatically passes `params` for dynamic routes
export default function UserProfile() {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-3xl mx-auto px-4">
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    {/* Header Banner */}
                    <div className="h-32 bg-gradient-to-r from-blue-500 to-blue-600" />
                    
                    {/* Profile Content */}
                    <div className="relative px-6 pb-6">
                        {/* Profile Picture */}
                        <div className="absolute -top-12 left-6">
                            <div className="bg-white p-2 rounded-full">
                                <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center">
                                    <User className="w-12 h-12 text-blue-600" />
                                </div>
                            </div>
                        </div>

                        {/* User Info */}
                        <div className="pt-14">
                            <div className="flex items-center gap-4 mb-4">
                                <h1 className="text-2xl font-bold text-gray-900">User Profile</h1>
                                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                    Active
                                </span>
                            </div>

                            {/* User ID Card */}
                            <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-200">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <span className="font-medium">User ID:</span>
                                    <span className="font-mono bg-white px-3 py-1 rounded border border-gray-200">
                                        
                                    </span>
                                </div>
                            </div>

                            {/* Sample Profile Details */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-5 h-5" />
                                    <span>user@example.com</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Calendar className="w-5 h-5" />
                                    <span>Joined December 2023</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5" />
                                    <span>Location</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
