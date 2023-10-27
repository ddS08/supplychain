import { QueryResultRow, sql } from '@vercel/postgres';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log('Data=', data);
  const name = data['retailer'];

  let message = '';
  let rows: QueryResultRow[] = [];

  try {
    if (!name) {
      message = 'Invalid user data';
    } else {
      const result = await sql`
        SELECT Key
        FROM roles
        WHERE Name=${name};
      `;
      if (result.rows.length === 1) {
        const keyValue = result.rows[0].key;
        message = 'valid';
        rows = result.rows;
      } else {
        message = 'User not found';
      }
    }
  } catch (error) {
    console.error('Error:', error);
    message = 'Failed to retrieve the key';
  }

  const responseJSON = JSON.stringify({ message, rows });

  return new Response(responseJSON, {
    headers: { 'Content-Type': 'application/json' },
    status: message === 'valid' ? 200 : 500,
  });
}
