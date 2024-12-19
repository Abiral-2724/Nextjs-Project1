import { NextResponse } from "next/server";


export async function GET() {
    try{
        const response = await NextResponse.json({
            message : "Logout successfully" ,
            success : true ,
        })
        response.cookies.set("token","" ,
            {httpOnly:true ,expires : new Date(0)}
        )
        return response ;
    }
    catch(error : unknown){
        return NextResponse.json(
            { error: (error as Error)?.message || "An unknown error occurred" },
            { status: 500 }
          );
    }
}