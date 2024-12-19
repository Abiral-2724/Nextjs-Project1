import {NextResponse } from "next/server";
import { connect } from "../../../../dbConfig/dbConfig";
import User from "../../../../models/userModel";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken" ;

connect();

export async function POST(request : NextResponse) {

    try{

        const reqBody = await request.json();
    const { email, password } = reqBody;

    console.log(reqBody) ;

    const user = await User.findOne({email}) ;
    if(!user){
        return NextResponse.json(
            { error: "User does not exits"},
            { status: 400 }
          );
    }

    const validPassword = await bcryptjs.compare(password ,user.password) ;

    if(!validPassword){
        return NextResponse.json(
            { error: "Invalid Password" },
            { status: 400 }
          );
    }

    // create token data 
    const tokenData = {
        id : user._id ,
        username : user.username ,
        email : user.email
    }

    const token = await jwt.sign(tokenData ,process.env.TOKEN_SECRET ,{expiresIn : "1d"}) ;


    const response = NextResponse.json({
        message : "Login successfully" ,
        success : true
    })

    response.cookies.set("token" ,token ,{
        httpOnly : true 
    })

    return response ; 




    }
    catch(error:unknown){
        return NextResponse.json(
            { error: error?.message || "An unknown error occurred" },
            { status: 500 }
          );
    }
    
}


