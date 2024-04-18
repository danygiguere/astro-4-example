import type { APIRoute } from "astro";
import I18n from "../../i18n";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { TOKEN } from "../../constants";
const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

export const POST: APIRoute = async (ctx) => {
  const locale = ctx.request.headers.get("accept-language");
  const i18n = new I18n(locale);
  try {
    const formData = await ctx.request.formData();
    const response = await fetch(`http://localhost:8012/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": i18n.locale,
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
    });
    const token = await new SignJWT({})
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(secret);

    // set cookies
    ctx.cookies.set(TOKEN, token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 2, // 2 hours in seconds
    });
    return new Response(
      JSON.stringify({
        user: await response.json(),
        message: i18n.t("validations.login-success"),
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: i18n.t("validations.login-error"),
      }),
      { status: 400 }
    );
  }
};
