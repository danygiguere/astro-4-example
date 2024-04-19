import { defineMiddleware } from "astro/middleware";
import { TOKEN, PUBLIC_ROUTES } from "./constants";
import verifyAuth from "./auth";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

export const onRequest = defineMiddleware(async (context, next) => {
  if (PUBLIC_ROUTES.includes(context.url.pathname)) {
    return next();
  }

  const token = context.cookies?.get(TOKEN)?.value;
  const validationResult = await verifyAuth(token);

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
      else {
        return Response.redirect(new URL(`/${context.currentLocale}/signin`, context.url));
      }

    default:
      return Response.redirect(
        new URL(`/${context.currentLocale}`, context.url)
      );
  }
});
