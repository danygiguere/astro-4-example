import { defineMiddleware } from "astro/middleware";
import { TOKEN, PROTECTED_ROUTES } from "./constants";
import verifyAuth from "./auth";

export const onRequest = defineMiddleware(async (context, next) => {
  const urlsWithNoTrailingSlash = context.url.pathname.replace(/\/$/, "");
  if (PROTECTED_ROUTES.includes(urlsWithNoTrailingSlash)) {
    const token = context.cookies?.get(TOKEN)?.value;
    const validationResult = await verifyAuth(token);

    switch (validationResult.status) {
      case "authorized":
        return next();

      case "error":
      case "unauthorized":
        if (urlsWithNoTrailingSlash.startsWith("/api")) {
          return new Response(
            JSON.stringify({ message: validationResult.msg }),
            {
              status: 401,
            }
          );
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