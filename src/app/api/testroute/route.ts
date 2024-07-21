//@ts-ignore
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db =await client.db("data");
  const { id} = await req.json();
  try{
  const user=await db.collection("users").findOne({ _id: new ObjectId(id as string) });
  if(user)
  {
    return new Response(
        JSON.stringify({
          message: "user",
          user
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  }
 
  else
  {
    return new Response(
        JSON.stringify({
          message: "f#cking idiot",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  }
}
catch(err)
{
    return new Response(
        JSON.stringify({
          message: "invalid id",
        }),
        {
          status: 369,
          headers: {
            "Content-Type": "application/json",
          },
        }
      ); 
}
}