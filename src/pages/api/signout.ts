import type { APIRoute } from "astro";
import I18n from "../../i18n";
import { TOKEN } from "../../constants";
const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

export const POST: APIRoute = async (context) => {
  const locale = context.request.headers.get("accept-language");
  const i18n = new I18n(locale);
  try {
    context.cookies.set(TOKEN, "", {
        httpOnly: true,
        maxAge: 0,
        path: "/",
    });
    return new Response(
      JSON.stringify({
        message: i18n.t("validations.signout-success"),
      }),
      { status: 200 }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({
        message: i18n.t("validations.signout-error"),
      }),
      { status: 400 }
    );
  }
};
