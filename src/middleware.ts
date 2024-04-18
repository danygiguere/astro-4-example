import { defineMiddleware } from "astro/middleware";
import { TOKEN, PUBLIC_ROUTES } from "./constants";
import verifyAuth from "./auth";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

export const onRequest = defineMiddleware(async (context, next) => {
  // console.log("middleware.ts context:", context);
  console.log("middleware.ts context.url.pathname:", context.url.pathname);
  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return next();
  }

  const token = context.cookies?.get(TOKEN)?.value;
  const validationResult = await verifyAuth(token);

  console.log("validationResult", validationResult);

  switch (validationResult.status) {
    case "authorized":
      return next();

    case "error":
    case "unauthorized":
      if (context.url.pathname.startsWith("/api/")) {
        return new Response(JSON.stringify({ message: validationResult.msg }), {
          status: 401,
        });
      }
      // otherwise, redirect to the root page for the user to login
      else {
        return Response.redirect(new URL("/en", context.url));
      }

    default:
      return Response.redirect(new URL("/en", context.url));
  }
});
