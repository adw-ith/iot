//@ts-ignore
import clientPromise from "@/lib/mongodb";
import { Request } from "@/types/types";

export async function POST(req: any, res: any) {
  //@ts-ignore
  const client = await clientPromise;
  const db = await client.db("data");
  const { membership_id, component_name, number } = await req.json();
  const component = await db
    .collection("components")
    .findOne({ name: component_name });
  if (component) {
    if (component.number < number) {
      return new Response(
        JSON.stringify({
          message: "item's available number is less than the request",
        }),
        {
          status: 300,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } else {
      const existing = await db
        .collection("requests")
        .findOne({ component_name, membership_id });

      if (existing) {
        if (existing.number + number <= component.number) {
          existing.number += number;
          const updateRequestRes = await db
            .collection("requests")
            .updateOne(
              { _id: existing._id },
              { $set: { number: existing.number } }
            );

          const updateUserRes = await db
            .collection("users")
            .updateOne(
              { membership_id, "requested_components.name": component_name },
              { $inc: { "requested_components.$.number": number } }
            );

          return new Response(
            JSON.stringify({
              message: "request made successfully",
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
              message: "item's available number is less than the request",
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
      const newRequest: Request = {
        component_name: component_name,
        membership_id: membership_id,
        number: number,
      };
      const newRequestres = await db
        .collection("requests")
        .insertOne(newRequest);
      const requested_component = {
        name: component_name,
        number: number,
      };
      const updateUserRes = await db
        .collection("users")
        .updateOne(
          { membership_id: membership_id },
          { $push: { requested_components: requested_component } }
        );
      return new Response(
        JSON.stringify({
          message: "request made successfully",
        }),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  } else {
    return new Response(
      JSON.stringify({
        message: "component not found",
      }),
      {
        status: 350,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
