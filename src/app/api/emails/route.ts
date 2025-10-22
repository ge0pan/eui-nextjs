import data from "./mock-data";

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1500));

  return Response.json(data);
}
