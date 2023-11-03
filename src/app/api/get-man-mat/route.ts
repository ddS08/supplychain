import { sql } from "@vercel/postgres";

interface Medicine {
    id: number;
    name: string;
    cost: number;
    tablets: number; // Make it optional by adding "?"
    manufacturingDate: string;
    expiryDate: string;
    manufacturer: string;
    image: string;
  }
  
export async function POST(request: Request) {
    console.log('POST request received for product information');
    let message = '';
    let medicinesData: Medicine[] = []; // Changed variable name to medicinesData
  
    try {
      // Retrieve medicine data where QuantityCart is false
      const medicinesResult = await sql`
        SELECT ManufacturingDate, ExpiryDate, Image, Cost, Name
        FROM manpro
        WHERE QuantityCart = false;
      `;
      console.log(medicinesResult.rows);
      if (medicinesResult.rows.length > 0) {
        // Map the retrieved data to the Medicine interface with an index for id
        medicinesData = medicinesResult.rows.map((row, index) => ({
          id: index + 1,
          name: row.name,
          cost: row.cost, // Replace with the appropriate value
          tablets:0,
          manufacturingDate: row.manufacturingdate,
          expiryDate: row.expirydate,
          manufacturer: '', // Replace with the appropriate value
          image: '',
        }));
        console.log(medicinesData);
        message = 'Product information retrieved successfully';
      } else {
        message = 'No product information with QuantityCart=false found in the database';
      }
    } catch (error) {
      console.error('Error:', error);
      message = 'Failed to fetch product information';
    }
  
    // Return a JSON response with the "message" and the medicine data
    return new Response(JSON.stringify({ message, medicinesData }), {
      headers: { 'Content-Type': 'application/json' },
      status: message.includes('retrieved successfully') ? 200 : 500,
    });
  }
  