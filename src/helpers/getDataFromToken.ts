
import jwt from "jsonwebtoken" ;
import { NextRequest} from "next/server";

// helper function to get data from token 
export const getDataFromToken = (request : NextRequest) => {
    try{
        const token = request.cookies.get("token")?.value || '' ;
        console.log(token) ;
       const decodedToken  = jwt.verify(token, process.env.TOKEN_SECRET!) ;
        console.log(decodedToken) ;
       return decodedToken.id ;


    }
    catch(error : unknown){
        throw new Error((error as Error)?.message) ;
    }
}