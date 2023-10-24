import { sql } from '@vercel/postgres';

// Define an interface to represent the shape of the database rows
interface Row {
  Name: string;
  Key: string;
  Role: string;
}

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log("data=", data);
  const Role = data['role'];
  let message = '';
  let rows: Row[] = []; // Use the defined interface to type 'rows'

  try {
    if (!Role) {
      message = 'Role required';
    } else {
      // Attempt to insert data into the database
      const nameResult = await sql`SELECT * from roles WHERE Role=${Role};`;
      console.log("nameasdh",nameResult);
      if (nameResult.rows.length > 0) {
        // Type 'rows' based on the expected structure of database rows
        rows = nameResult.rows.map((row: any) => ({
          Name: row.name,
          Key: row.key,
          Role: row.role,
        }));
        console.log("rowssdjfn",rows);
        message="valid"
      } else {
        message = 'No user found with the provided Key';
      }
    }
  } catch (error) {
    console.log('error', error);
    message = 'Failed to add user'; // Error message
  }
  console.log("helloooo");

  // Return a JSON response with the "message" and "rows"
  return new Response(JSON.stringify({ message, rows }), {
    headers: { 'Content-Type': 'application/json' },
    status: message === 'valid' ? 200 : 500,
  });
}
