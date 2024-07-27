//@ts-ignore
import clientPromise from "@/lib/mongodb";
import { Component, User } from "@/types/types";

export async function GET(req: Request) {
  try {
    //@ts-ignore
    const client = await clientPromise;
    const db = client.db("data");

    // Fetch all users
    const users = await db.collection("users").find({}).toArray();

    const borrowedComponentsWithMembershipId = users.flatMap((user: User) =>
      (user.borrowed_components as Component[]).map((component: Component) => ({
        component,
        membership_id: user.membership_id,
      }))
    );

    return new Response(
      JSON.stringify({
        borrowedComponents: borrowedComponentsWithMembershipId,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({
        message: "Failed to fetch borrowed components",
      }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
