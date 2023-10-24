import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log('Data=', data);
  const username = data['username'];
  const email = data['email'];
  const password = data['password'];
  const confirmPassword = data['confirmPassword'];
  const ethereumAddress = data['ethereumAddress'];
  let message = '';

  try {
    if (!username || !email || !password || !ethereumAddress || password !== confirmPassword) {
      message = 'Invalid user registration data';
    } else {
      // Attempt to insert user data into the database
      const result = await sql`
        INSERT INTO users (username, email, password, ethereum_address)
        VALUES (${username}, ${email}, ${password}, ${ethereumAddress})
      `;
      console.log('User registered successfully', result);
      message = 'User registered successfully'; // Success message
    }
  } catch (error) {
    console.error('Error:', error);
    message = 'Failed to register user'; // Error message
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
