import { defineMiddleware } from "astro/middleware";
import { TOKEN, PROTECTED_ROUTES } from "./constants";
import verifyAuth from "./auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const cleanContextUrl = context.url.pathname.replace(/\/$/, "");
  if (PROTECTED_ROUTES.includes(cleanContextUrl)) {
    // I should move the verifyAuth into a auth middleware and apply that middleware on specific pages
    const token = context.cookies?.get(TOKEN)?.value;
    const validationResult = await verifyAuth(token);

    switch (validationResult.status) {
    case "authorized":
      return next();

    case "error":
    case "unauthorized":
      if (cleanContextUrl.startsWith("/api")) {
        return new Response(JSON.stringify({ message: validationResult.msg }), {
          status: 401,
        });
      } else {
        return Response.redirect(
          new URL(`/${context.currentLocale}/signin`, context.url)
        );
      }
    default:
      return Response.redirect(
        new URL(`/${context.currentLocale}/signin`, context.url)
      );
    }
  }
  return next();
});