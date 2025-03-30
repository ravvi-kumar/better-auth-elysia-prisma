import { Elysia } from "elysia";
import { swagger } from '@elysiajs/swagger'
import  { cors } from '@elysiajs/cors'
import betterAuthView from "./lib/auth-view";
import { auth } from "./lib/auth";

const app = new Elysia()
.use(cors()).use(swagger())
.all("/api/auth/*", betterAuthView)
// user middleware (compute user and session and pass to routes)
.macro({
  auth: {
    async resolve({ error, request: { headers } }) {
      const session = await auth.api.getSession({
        headers,
      });

      if (!session) return error(401);

      return {
        user: session.user,
        session: session.session,
      };
    },
  },
})
.get("/user", ({ user }) => user, {
  auth: true,
})
.get("/", () => "Hello Elysia")
.listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
