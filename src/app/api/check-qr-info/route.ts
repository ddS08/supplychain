import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  console.log('POST request received');
  const data = await request.json();
  console.log("data=", data);
  const rawmat = data['rawmaterialval'];
  const imageBuffer = data['imageBuffer'];
  let message = '';
  let materialId = null;
  let id = null;

  try {
    if (!rawmat && !imageBuffer) {
        message = 'No user found with the provided Key';
    } else {
        if(!rawmat)
        {
            console.log("asdajsdkasdas");
            const nameResult = await sql`SELECT * from qrcodes where qrimage=${imageBuffer};`;
            if (nameResult.rows.length > 0) {
                materialId = nameResult.rows[0].materialid;
                id= nameResult.rows[0].id
                message = 'Material ID found';
                console.log(materialId);
            } else {
                message = 'No user found with the provided Key';
            }
        }
        else if(!imageBuffer){
            console.log("hiii");
            const nameResult = await sql`SELECT * from qrcodes WHERE materialid=${rawmat};`;
            if (nameResult.rows.length > 0) {
                message = "User found";
                id= nameResult.rows[0].id
            } else {
                message = 'No user found with the provided Key';
            }
        }
        else{
          message='No user found with the provided Key';
        }
    }
  } catch (error) {
    console.log('error', error);
    message = 'Failed to add user'; // Error message
  }
  console.log("helloooo");

  // Include materialId in the JSON response
  const responseObj = {
    message,
    materialId,
    id,
  };

  // Return a JSON response with the "message" and "materialId"
  return new Response(JSON.stringify(responseObj), {
    headers: { 'Content-Type': 'application/json' },
    status: message === 'No user found with the provided Key' ? 500 : 200,
  });
}
