import { query } from "@/lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

const cookieExpirationDate = 2 * 60 * 60; // 2 Hrs

export async function POST(request: Request) {

  try {
      const { email, password} = await request.json();

      const results = await query(
          `
          SELECT userid, username, usertype, lastlogin FROM "user"
          WHERE email = $1 AND passwd = $2
          `,
          [email, password]
      )
      if (results.rows[0]) {
          const sessionId = uuidv4();

          const responseData = NextResponse.json(results.rows[0]);
          
          responseData.cookies.set('sessionId', sessionId, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
            maxAge: cookieExpirationDate,
          });

          await query(
            `
            INSERT INTO activesessions (sessionid, userid)
            VALUES ($1, $2);
            `, [sessionId, results.rows[0].userid]
          )


          return responseData
        } else {
          return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
          );
        }
      } catch (error) {
        return NextResponse.json(
          { error: `Server error ${error}` },
          { status: 500 }
        );
      }
    }