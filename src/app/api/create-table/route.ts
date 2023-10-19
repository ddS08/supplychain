import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  try {
    const result =
      await sql`CREATE TABLE roles ( Name varchar(255), Key varchar(255), Role varchar(255) );`;
    const vals= ['Admin', '0x4D61290539D9a062E119aa2AE179faEB6d73b8b9', 'Admin'];
  

    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}

