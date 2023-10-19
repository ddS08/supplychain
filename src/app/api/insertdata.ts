import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Define the data to be inserted
    const data = {
      Name: 'Admin',
      Key: '0x4D61290539D9a062E119aa2AE179faEB6d73b8b9',
      Role: 'Admin',
    };

    // Insert data into the "roles" table
    await sql`
      INSERT INTO roles (Name, Key, Role)
      VALUES (${data.Name}, ${data.Key}, ${data.Role});
    `;

    return NextResponse.json({ message: 'Data inserted successfully' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
