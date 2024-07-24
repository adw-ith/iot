//@ts-ignore
import clientPromise from "@/lib/mongodb";

export async function GET(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = await client.db("data");
  const membership_id = req.nextUrl.searchParams.get("membership_id");
  if (membership_id) {
    const user = await db
      .collection("users")
      .findOne(
        { membership_id: membership_id },
        { projection: { password: 0 } }
      );
    if (user) {
      return new Response(
        JSON.stringify({
          message: "user found",
          user: user,
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
          message: "user not found",
          user: user,
        }),
        {
          status: 303,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    const users = await db
      .collection("users")
      .find({}, { projection: { password: 0 } })
      .toArray();
    return new Response(
      JSON.stringify({
        message: "all users",
        users: users,
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
