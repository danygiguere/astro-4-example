import { errors, jwtVerify } from "jose";
import type { APIContext } from "astro";
import { TOKEN } from "./constants";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

// const getSession = async ({ cookies }: APIContext) => {
//   const token = cookies?.get(TOKEN)?.value;
//   // should return a user
// };

const verifyAuth = async (token?: string) => {
  try {
    if (!token) {
      return {
        status: "unauthorized",
        msg: "please pass a request token",
      } as const;
    } 
    const jwtVerifyResult = await jwtVerify(token, secret);

    return {
      status: "authorized",
      payload: jwtVerifyResult.payload,
      msg: "successfully verified auth token",
    } as const;
  } catch (err) {
    if (err instanceof errors.JOSEError) {
      return { status: "error", msg: err.message } as const;
    }

    console.debug(err);
    return { status: "error", msg: "could not validate auth token" } as const;
  }
};

export default verifyAuth;
