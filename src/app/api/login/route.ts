//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db =await client.db("data");
  const { membership_id, password } = await req.json();
  console.log(`member is ${membership_id} password is ${password}`)
  const user =await db.collection("users").findOne({membership_id:membership_id,password:password});
  console.log(user);
  if (user) {
    return new Response(
      JSON.stringify({
        message: "login success",
        user:user
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
}
