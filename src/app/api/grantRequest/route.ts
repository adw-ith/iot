//@ts-ignore
import clientPromise from "@/lib/mongodb";
import { User } from "@/types/types";
import { ObjectId } from "mongodb";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db =await client.db("data");
  const {requestId,membership_id} = await req.json();
  try{
  const requestgetRes=await db.collection('requests').findOne({_id: new ObjectId(requestId as string) })
  console.log('get')
  console.log(requestgetRes)
  if(requestgetRes.component_name)
  {
    const requestRes=await db.collection('requests').deleteOne({ _id: new ObjectId(requestId as string) })
    console.log('delete')
    console.log(requestRes)
    const filter={
      name:requestgetRes.component_name,
      number:requestgetRes.number
    }
  if(requestRes.acknowledged)
  {
    const usersRes=await db.collection('users').updateOne(
      { membership_id:membership_id },
      { $pull: {requested_components:filter} })
      if(usersRes.acknowledged)
      {
       const usersRes2=await db.collection('users').updateOne(
         { membership_id:membership_id },
         { $push: {borrowed_components:filter} })
         if(usersRes2.acknowledged)
         {
          const usersRes=await db.collection('components').updateOne(
            { name:filter.name},
            { $inc: { number: -(filter.number)}  })
           return new Response(
             JSON.stringify({
               message: "grant success",
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
  }    
      }
   
      return new Response(
        JSON.stringify({
          message: "grant error",
        }),
        {
          status: 307,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  }
  
        
   catch(err)
   {
    return new Response(
        JSON.stringify({
          message: "error",
            error:err
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