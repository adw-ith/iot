//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function GET(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db =await client.db("data");
  const components=await db.collection("components").find({}).toArray()
  return new Response(
    JSON.stringify({
      message: "all components",
      components
    }),
    {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}