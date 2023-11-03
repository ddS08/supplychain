import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log('Data=', data);
  const ManufacturingDate = data['manufacturingDate'];
  const ExpiryDate = data['expiryDate'];
  const Image = data['image'];
  const Cost = data['cost'];
  const QuantityCart = 'false';
  const Name = data['name'];
  let message = '';

  try {
    if (!ManufacturingDate || !ExpiryDate || !Cost || !QuantityCart || !Name) {
      message = 'All fields are required';
    } else {
      // Attempt to insert data into the "Product" table
      const result = await sql`
        INSERT INTO manpro (ManufacturingDate, ExpiryDate, Image, Cost, QuantityCart, Name)
        VALUES (${ManufacturingDate}, ${ExpiryDate}, ${Image}, ${Cost}, ${QuantityCart}, ${Name});
      `;
      console.log('Product added successfully', result);
      message = 'Product added successfully';
    }
  } catch (error) {
    console.error('Error:', error);
    message = 'Failed to add the product';
  }

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Product Status</title>
      </head>
      <body>
        <h1>${message}</h1>
      </body>
    </html>
  `;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html' },
    status: message.includes('successfully') ? 200 : 500,
  });
}
