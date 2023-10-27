import { getPublicKeyFromMetaMask } from '@/app/backend/ethaddressreceiver';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  
  console.log('POST request received');
  const data = await request.json();
  console.log('Data=', data);
  const id = data['id'];
  const name = data['name'];
  const quantity = data['quantity'];
  const publickey= data['publickey'];
  let message = '';
  let Name='';
  try {
    if (!id || !name || !quantity) {
      message = 'Invalid product data';
    } else {

      const nameResult = await sql`SELECT Name from roles WHERE Key=${publickey};`;
      if (nameResult.rows.length > 0) {
        try {
          Name = nameResult.rows[0].name;
          message = `The name associated with the provided Key is: ${Name}`;
        } catch (error) {
          console.error('Error parsing JSON:', error);
          // Provide a default value or handle the error as needed
        }
      }
      // Attempt to insert product data into the database
      const result = await sql`
        INSERT INTO product (id, name, quantity, Supplier_name, Supplier_eth_address)
        VALUES (${id}, ${name}, ${quantity}, ${Name},${publickey})
      `;
      console.log('Product inserted successfully', result);
      message = 'Product inserted successfully'; // Success message
    }
  } catch (error) {
    console.error('Error:', error);
    message = 'Failed to insert product'; // Error message
  }

  // HTML template
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Product Insertion Status</title>
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
