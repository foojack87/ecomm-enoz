// export default function handler(req, res) {
//   res.json(req.method);
// }

export async function POST(request) {
  const body = await request.json();
  console.log(body);

  return new Response('OK');
}
