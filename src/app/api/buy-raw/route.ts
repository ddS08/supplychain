import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log("data=", data);
  const id = data['id'];
  const quant = data['totalQuantity'];
  let message = '';

  try {
    // Update the quantity in the database using SQL
    await sql`
      UPDATE product
      SET quantity = ${quant}
      WHERE Id = ${id}
    `;

    return new Response(JSON.stringify({ message: 'Quantity updated successfully' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error updating quantity:', error);
    return new Response(JSON.stringify({ message: 'Failed to update quantity' }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500,
    });
  }
}
