import { getDataFromToken } from "../../../../helpers/getDataFromToken";
import User from "../../../../models/userModel";
import { connect } from "../../../../dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

connect() ;

export async function GET(request : NextRequest) {
    try{
      const userId = await getDataFromToken(request) ;
     const user = await User.findOne({_id : userId}).select("-password") ;
     console.log(user) ;
     return NextResponse.json({
        message : "User found" ,
        data : user 
     })
    }
    catch(error : unknown){
        return NextResponse.json({error:(error as Error)?.message} ,{status : 400}) 
    }
}

