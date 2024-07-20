//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function POST(req:any,res:any)
{
   //@ts-ignore
    const client = await clientPromise;
    const db = client.db('data'); 
    const {membership_id,password}=await req.json();
    const user=db.collection('users').findOne({membership_id,password})
    if(user)
    {
        return new Response(
            JSON.stringify({
              message: "user does'nt exist",
            }),
            {
              status: 300,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
    }
    else{
        return new Response(
            JSON.stringify({
              message: "login success",
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