
import jwt from "jsonwebtoken" ;
import { NextResponse } from "next/server";

// helper function to get data from token 
export const getDataFromToken = (request : NextResponse) => {
    try{
        const token = request.cookies.get("token")?.value || '' ;
        console.log(token) ;
       const decodedToken : unknown = jwt.verify(token, process.env.TOKEN_SECRET!) ;
        console.log(decodedToken) ;
       return decodedToken.id ;


    }
    catch(error : unknown){
        throw new Error(error.message) ;
    }
}