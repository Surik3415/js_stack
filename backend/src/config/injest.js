import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/user.model.js";

export const inngest = new Inngest({ id: "jsstack" });

const syncUser = inngest.createFunction(
  { id:"sync-user" },
  { event: "clerk/user.created"},
  async({ event }) => {
    await connectDB()

    const { id, email_addresses, first_name, last_name, image_url} = event.data
    const newUser = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: `${first_name || ""} ${last_name || ""}`.trim() || "user",
      avatarImageUrl: image_url,
      addresses: [],
      wishlist: [],
    }

    await User.create(newUser)
  }
)

const deleteUserByClerkId= inngest.createFunction(
  { id: "delete-user-by-clerk-id" },
  { event: "clerk/user.deleted"},
  async({ event }) => {
    await connectDB()

    const { id } = event.data
    await User.deleteOne({
      clerkId: id
    })
  }
)

export const functions = [syncUser, deleteUserByClerkId]
