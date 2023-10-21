import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
    
  console.log('POST request received'); // Add this line
  const data = await request.json();
  console.log("data=",data);
  const Key = data['key'];
  const Role = data['role'];
  let message = '';
  
  try {
    if ( !Key || !Role) {
      message = 'Name and key required';
    } else {
      // Attempt to insert data into the database
      
      const nameResult = await sql`SELECT Name from roles WHERE Key=${Key};`;
      if (nameResult.rows.length > 0) {
        console.log(nameResult);
        try {
            const Name = nameResult.rows[0].name;
        const deleteResult = await sql`DELETE FROM roles WHERE Key=${Key};`;
        console.log("Deleted result=",deleteResult);
        const insertResult = await sql`INSERT INTO roles (Name, Key, Role) VALUES (${Name}, ${Key}, ${Role});`;
        console.log('User added successfully', insertResult);
        message = 'User added successfully';
        console.log('hiii');
      } catch (error) {
            console.error('Error parsing JSON:', error);
            // Provide a default value or handle the error as needed
          }
        }
        else {
            message = 'No user found with the provided Key';
              } 

      // User added message
    }
  } catch (error) {
    console.log('error', error);
    message = 'Failed to add user'; // Error message
  }
  console.log("helloooo");

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
