import data from "./mock-data";

export async function GET() {
  return Response.json(data);
}
