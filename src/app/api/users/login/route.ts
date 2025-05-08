import { query } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { email, password} = await request.json();

        const results = await query(
            `
            SELECT usertype FROM "user"
            WHERE email = $1 AND passwd = $2
            `,
            [email, password]
        )
        if (results.rows[0]) {
            return NextResponse.json(results.rows[0]);
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