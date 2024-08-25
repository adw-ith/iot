//@ts-ignore
import clientPromise from "@/lib/mongodb";
import { User } from "@/types/types";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = client.db("data");
  const { membership_id, password, role, name, email } = await req.json();

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

  const user: User = {
    name: name ?? "",
    email: email ?? "",
    membership_id,
    password,
    role: role ?? "user",
    requested_components: [],
    borrowed_components: [],
  };

  const newUser = await db.collection("users").insertOne(user);
  console.log(newUser);
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
