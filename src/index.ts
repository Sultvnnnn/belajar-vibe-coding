import { Elysia } from "elysia";
import { env } from "./config/env";
import { healthRoutes } from "./routes/health";
import { userRoutes } from "./routes/users";

const app = new Elysia()
  .get("/", () => ({
    name: "VibeCode Backend API",
    version: "1.0.0",
    docs: "/health, /users",
  }))
  .use(healthRoutes)
  .use(userRoutes)
  .onError(({ code, error, set }) => {
    if (code === "NOT_FOUND") {
      set.status = 404;
      return { success: false, message: "Route not found" };
    }
    if (code === "VALIDATION") {
      set.status = 400;
      return { success: false, message: "Validation error", error: error.message };
    }
    const message =
      error instanceof Error
        ? error.message
        : typeof error === "object" && error !== null && "response" in error
        ? String((error as { response: unknown }).response)
        : "Internal server error";

    return { success: false, message };
  })
  .listen(env.PORT);

console.log(
  `🚀 Server is running at http://${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
