import { sql } from '@vercel/postgres';
interface RawMaterial {
    name: string;
    supplier: string;
    totalQuantity: number;
  }
export async function POST(request: Request) {
  console.log('POST request received123');
  let message = '';
  let rawMaterials: RawMaterial[] = []; // Initialize an empty array for raw materials data.

  try {
    // Retrieve all products from the database
    const productsResult = await sql`SELECT Name, Id, Supplier_name, Quantity, Supplier_eth_address FROM product`;
    console.log(productsResult);
    if (productsResult.rows.length > 0) {
      const productData = productsResult.rows;
      console.log("proea",productData);
      // Format the retrieved product data into an array
      rawMaterials = productData
  .filter((product) => product.quantity > 0)
  .map((product) => ({
    Supplier_eth_address:product.supplier_eth_address,
    name: product.name,
    supplier: product.supplier_name,
    totalQuantity: product.quantity,
    selectedQuantity: 0,
    id: product.id,
  }));

      console.log(rawMaterials);    
      message = 'Product information retrieved successfully';
    } else {
      message = 'No products found in the database';
    }
  } catch (error) {
    console.log('error', error);
    message = 'Failed to fetch product information'; // Error message
  }
  console.log("helloooo");

  // Return a JSON response with the "message" and the raw materials data
  return new Response(JSON.stringify({ message, rawMaterials }), {
    headers: { 'Content-Type': 'application/json' },
    status: message.includes('retrieved successfully') ? 200 : 500,
  });
}
