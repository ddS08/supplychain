import { sql } from "@vercel/postgres";
export async function POST(request: Request) {
    console.log('POST request received for product information');
    let message = '';
    console.log('POST request received');
    const data = await request.json();
    const name= data['name'];

  
    try {
      // Retrieve medicine data where QuantityCart is false
      const medicinesResult = await sql`
      UPDATE manpro
      SET QuantityCart = true
      WHERE name = ${name};
      `;
      console.log(medicinesResult.rows);
      if (medicinesResult.rows.length > 0) {
        message = 'Product information retrieved successfully';
      } else {
        message = 'No product information with QuantityCart=false found in the database';
      }
    } catch (error) {
      console.error('Error:', error);
      message = 'Failed to fetch product information';
    }
  
    // Return a JSON response with the "message" and the medicine data
    return new Response(JSON.stringify({ message }), {
      headers: { 'Content-Type': 'application/json' },
      status: message.includes('retrieved successfully') ? 200 : 500,
    });
  }
  