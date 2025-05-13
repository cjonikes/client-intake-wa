import { query } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";


export async function POST() {

  try {
    // const userid = await request.json();
    const cookieStore = await cookies();
    const uuidCookie = cookieStore.get('sessionId')?.value;
    
    if(uuidCookie === "null") { 
        return NextResponse.json(
            { error: `Unautorized` },
            { status: 401 }
            );
    }

    const result = await query(
        `
        SELECT userid
        FROM activesessions
        WHERE sessionid = $1;
        `,
        [ uuidCookie ]
    )

    const userid = result.rows[0]?.userid;

    await query(
        `
        UPDATE "public"."user"
        SET lastlogin =  $1
        WHERE userid = $2;
        `,
        [ new Date(), userid ]
    )


    await query(
        `
        DELETE FROM activesessions
        WHERE sessionid = $1;
        `, [uuidCookie]
    );

    const response = NextResponse.json({
        "status": "succeed"
    })

    cookieStore.set('sessionId', String(uuidCookie), {maxAge: 0});

    response.cookies.set('sessionId', "null", {
        maxAge: 0,
    });

    return response;
    

    } catch (error) {
        return NextResponse.json(
        { error: `Server error here ${error}` },
        { status: 500 }
        );
    }

}