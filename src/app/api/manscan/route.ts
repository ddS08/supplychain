import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log('Data=', data);
  const id = data['id'];
  let message = '';
  let productData = null; // Initialize the product data to null

  try {
    // Attempt to retrieve product data from the database based on the provided id
    const productResult = await sql`SELECT * FROM product WHERE Id = ${id}`;

    if (productResult.rows.length > 0) {
      // Product data found
      productData = productResult.rows[0];
      message = 'Product data retrieved successfully';
    } else {
      message = 'No product found with the provided id';
    }
  } catch (error) {
    console.error('Error:', error);
    message = 'Failed to retrieve product data'; // Error message
  }

  // Return a JSON response with the "message" and the retrieved product data
  return new Response(
    JSON.stringify({ message, productData }),
    {
      headers: { 'Content-Type': 'application/json' },
      status: message.includes('retrieved successfully') ? 200 : 500,
    }
  );
}
