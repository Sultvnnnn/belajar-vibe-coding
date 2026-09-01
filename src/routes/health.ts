import { Elysia } from "elysia";
import { poolConnection } from "../db";

export const healthRoutes = new Elysia({ prefix: "/health" })
  .get("/", async () => {
    let dbStatus = "disconnected";
    try {
      const connection = await poolConnection.getConnection();
      await connection.ping();
      connection.release();
      dbStatus = "connected";
    } catch (err) {
      dbStatus = `unavailable (${err instanceof Error ? err.message : String(err)})`;
    }

    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      database: dbStatus,
      uptime: process.uptime(),
    };
  });
