import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log("data=", data);
  const Key = data['key'];
  const Role = data['role'];
  let message = '';

  try {
    if (!Key || !Role) {
      message = 'Name and key required';
    } else {
      // Attempt to insert data into the database
      console.log("asdbadj");
      const nameResult = await sql`SELECT Role from roles WHERE Key=${Key};`;
      if (nameResult.rows.length > 0) {
        try {
          const Name = nameResult.rows[0].role;
          if (Name == Role) {
            message = 'valid';
          } else {
            message = 'invalid';
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Provide a default value or handle the error as needed
        }
      } else {
        message = 'No user found with the provided Key';
      }
    }
  } catch (error) {
    console.log('error', error);
    message = 'Failed to add user'; // Error message
  }
  console.log("helloooo");

  // Return a JSON response with the "message"
  return new Response(JSON.stringify({ message }), {
    headers: { 'Content-Type': 'application/json' },
    status: message === 'valid' ? 200 : 500,
  });
}
