import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('POST request received'); // Add this line
  const data = await request.json();
  console.log('Name=', data);
  const qrImage = data['qrImage'];
  const rawMaterialId = data['rawMaterialId'];
  let message = '';

  try {
    if (!qrImage || !rawMaterialId) {
      message = 'Name and key required';
    } 
    else {
      // Attempt to insert data into the database;
      const result = await sql`INSERT INTO qrcodes (materialid, qrimage) VALUES (${rawMaterialId},${qrImage});
      `;
      console.log('user added successfully', result);
      message = 'User added successfully'; // User added message
    }
  } catch (error) {
    console.log('error', error);
    message = 'Failed to add user'; // Error message
  }

  // HTML template
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Status</title>
      </head>
      <body>
        <h1>${message}</h1>
      </body>
    </html>
  `;

  // Return an HTML response
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
    status: message.includes('successfully') ? 200 : 500,
  });
}
