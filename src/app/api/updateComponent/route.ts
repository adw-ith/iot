//@ts-ignore
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
export async function PUT(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  let updates = 0;
  const db = await client.db("data");
  const { name, newTotal, newName } = await req.json();
  if (newTotal) {
    try {
      const component = await db
        .collection("components")
        .findOne({ name: name });
      if (!component) {
        return new Response(
          JSON.stringify({ message: "Component not found" }),
          { status: 404, headers: { "Content-Type": "application/json" } }
        );
      }
      const currentTotal = component.total;

      const compRes = await db.collection("components").updateOne(
        { name: name },
        {
          $set: { total: newTotal },
          $inc: { number: newTotal - currentTotal },
        }
      );

      if (compRes.acknowledged) {
        updates++;
      } else {
        return new Response(
          JSON.stringify({
            message: "unsuccessfully. Total update error",
          }),
          {
            status: 300,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "error",
          error,
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
  if (newName) {
    try {
      const usersRes3 = await db.collection("users").find({}).toArray();
      for (var i = 0; i < usersRes3.length; i++) {
        if (usersRes3[i].borrowed_components) {
          for (var j = 0; j < usersRes3[i].borrowed_components.length; j++) {
            if (usersRes3[i].borrowed_components[j].name === name) {
              return new Response(
                JSON.stringify({
                  message:
                    "component exists in the users. Remove it from borrowed_components before proceeding",
                }),
                {
                  status: 306,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            }
          }
        }
        if (usersRes3[i].requested_components) {
          for (var j = 0; j < usersRes3[i].requested_components.length; j++) {
            if (usersRes3[i].requested_components[j].name === name) {
              return new Response(
                JSON.stringify({
                  message:
                    "component exists in the users. Remove it from requested_components before proceeding",
                }),
                {
                  status: 305,
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
            }
          }
        }
      }
      const existing = await db
        .collection("components")
        .findOne({ name: newName });
      if (existing) {
        return new Response(
          JSON.stringify({
            message: "Component name already taken already exists",
          }),
          {
            status: 302,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      const compRes = await db
        .collection("components")
        .updateOne({ name: name }, { $set: { name: newName } });
      if (compRes.acknowledged) {
        updates++;
      } else {
        return new Response(
          JSON.stringify({
            message: "unsuccessfully. name update error",
          }),
          {
            status: 303,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
    } catch (error) {
      return new Response(
        JSON.stringify({
          message: "error",
          error,
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
  if (updates === 0) {
    return new Response(
      JSON.stringify({
        message: "no updates made",
      }),
      {
        status: 304,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } else {
    return new Response(
      JSON.stringify({
        message: "updated successfully",
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
