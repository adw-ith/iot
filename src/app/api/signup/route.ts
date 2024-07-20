//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data");
  const { membership_id, password } = await req.json();

  const existingUser = await db.collection("users").findOne({ membership_id });
  if (existingUser) {
    return new Response(
      JSON.stringify({
        message: "User already exists",
      }),
      {
        status: 300,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }

  const newUser = await db
    .collection("users")
    .insertOne({ membership_id, password });
  console.log(newUser)
  if (newUser.insertedId) {
    return new Response(
      JSON.stringify({
        message: "Signup successful",
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
        message: "Signup failed",
      }),
      {
        status: 444,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
