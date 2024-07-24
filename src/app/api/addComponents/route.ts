//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data");
  const { name, number } = await req.json();

  const existing = await db.collection("components").findOne({ name });
  if (existing) {
    return new Response(
      JSON.stringify({
        message: "Component already exists",
      }),
      {
        status: 300,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const newComponent = await db
    .collection("components")
    .insertOne({ name, number, total: number });
  if (newComponent.insertedId) {
    return new Response(
      JSON.stringify({
        message: "Component adding successful",
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "Component adding failed",
      }),
      {
        status: 504,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
