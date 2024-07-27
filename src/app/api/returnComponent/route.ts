//@ts-ignore
import clientPromise from "@/lib/mongodb";

import { ObjectId } from "mongodb";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db =await client.db("data");
  const {membership_id,borrowed_component} = await req.json();
  try{
    const usersRes=await db.collection('users').updateOne(
        { membership_id:membership_id },
        { $pull: {borrowed_components:borrowed_component}})
        if(usersRes.acknowledged)
        {
            const usersRes=await db.collection('components').updateOne(
                { name:borrowed_component.name},
                { $inc: { number: (borrowed_component.number)}  })
            if(usersRes.acknowledged)
            {
              return new Response(
                JSON.stringify({
                  message: "update success",
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
        return new Response(
          JSON.stringify({
            message: "unsuccessful",
          }),
          {
            status: 300,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );  
  }
  catch(error)
  {
    return new Response(
        JSON.stringify({
          message: "error",
          error
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