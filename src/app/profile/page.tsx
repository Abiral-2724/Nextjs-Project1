"use client"

import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function profilePage() {
    const router = useRouter()

    const logout = async () => {
        try{
            await axios.get("/api/users/logout") ;
            toast.success("Logout succesfully") ;
            router.push('/login') ;
        }
        catch(error : any){
            toast.error("Error while logging out") ;
        }
    }
const [data ,setData] = useState('nothing')
    const getUserDetails = async () => {
        const res = await axios.get('/api/users/me') ;
        console.log(res.data) ;
        setData(res.data.data._id) ;
    }

    return (
        <div>
            <h1>Profile</h1>
            <hr />
            <p>Profile page</p>
            <div>
                <h2>{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h2>
            </div>
            <div>
                <button onClick={logout} className="border-2 ml-20 bg-red-500">Logout</button>
            </div>
            <div>
<button onClick={getUserDetails}>
        get user details
</button>
            </div>
        </div>
    );
}