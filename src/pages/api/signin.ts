import type { APIRoute } from "astro";
import I18n from "../../i18n";
import { SignJWT } from "jose";
import { nanoid } from "nanoid";
import { JWT_TOKEN } from "../../constants";

export const POST: APIRoute = async ({ request }) => {
  const locale = request.headers.get("accept-language");
  const i18n = new I18n(locale);
  try {
    const formData = await request.formData();
    const response = await fetch(`http://localhost:8012/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": i18n.locale,
      },
      body: JSON.stringify(Object.fromEntries(formData.entries())),
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
