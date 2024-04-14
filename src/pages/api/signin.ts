import type { APIRoute } from "astro";
import I18n from "../../i18n";


export const POST: APIRoute = async ({ request }) => {
  const locale = request.headers.get("accept-language");
  const i18n = new I18n(locale);

  const data = await request.formData();
  const email = data.get("email");
  const password = data.get("password");
  if (!email || !email || !password) {
    return new Response(
      JSON.stringify({
        message: i18n.t("errors.missing-fields")
      }),
      { status: 400 }
    );
  }
  return new Response(
    JSON.stringify({
      message: i18n.t("errors.success")
    }),
    { status: 200 }
  );
};
