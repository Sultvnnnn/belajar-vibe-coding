import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema";

export const userRoutes = new Elysia({ prefix: "/users" })
  // Get all users
  .get("/", async () => {
    const allUsers = await db.select().from(users);
    return {
      success: true,
      data: allUsers,
    };
  })

  // Get user by ID
  .get(
    "/:id",
    async ({ params, set }) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        set.status = 400;
        return { success: false, message: "Invalid user ID" };
      }

      const result = await db.select().from(users).where(eq(users.id, id));
      const user = result[0];

      if (!user) {
        set.status = 404;
        return { success: false, message: "User not found" };
      }

      return {
        success: true,
        data: user,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )

  // Create new user
  .post(
    "/",
    async ({ body, set }) => {
      try {
        const [result] = await db.insert(users).values({
          name: body.name,
          email: body.email,
        });

        const insertId = result.insertId;
        const [newUser] = await db.select().from(users).where(eq(users.id, insertId));

        set.status = 201;
        return {
          success: true,
          message: "User created successfully",
          data: newUser,
        };
      } catch (err: any) {
        if (err?.code === "ER_DUP_ENTRY") {
          set.status = 409;
          return { success: false, message: "Email already exists" };
        }
        set.status = 500;
        return { success: false, message: err?.message || "Failed to create user" };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
        email: t.String({ format: "email" }),
      }),
    }
  )

  // Delete user by ID
  .delete(
    "/:id",
    async ({ params, set }) => {
      const id = Number(params.id);
      if (isNaN(id)) {
        set.status = 400;
        return { success: false, message: "Invalid user ID" };
      }

      const [result] = await db.delete(users).where(eq(users.id, id));
      if (result.affectedRows === 0) {
        set.status = 404;
        return { success: false, message: "User not found" };
      }

      return {
        success: true,
        message: "User deleted successfully",
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  );
