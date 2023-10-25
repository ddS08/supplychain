import { sql } from '@vercel/postgres';
import { Console } from 'console';
import { Result } from 'postcss';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log('Data=', data);
  const eth = data['publickey'];

  let message = '';

  try {
    if (!eth ) {
      message = 'Invalid user registration data';
    } else {
      // Attempt to insert user data into the database
      const result = await sql`
      SELECT * FROM users
      WHERE Ethereum_address=${eth};
      `;
      console.log(Result);
      if (result.rows.length === 1) {
        // User is authenticated, return success response
        return new Response('Login successfully', { status: 200 });
      } else {
        console.log("jihihi");
        // User is not authenticated, return an error response
        return new Response('Login failed', { status: 500 });
      }
    }
  } catch (error) {
    console.error('Error:', error);
    message = 'Failed to Login'; // Error message
  }

  // HTML template
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>User Registration Status</title>
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
