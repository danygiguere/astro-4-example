import { errors, jwtVerify } from "jose";
import type { APIContext } from "astro";
import { TOKEN } from "./constants";

const secret = new TextEncoder().encode(import.meta.env.JWT_SECRET_KEY);

function parseJwt(token: string) {
  return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
}

export const getSession = async ({ cookies }: APIContext) => {
  const token = cookies?.get(TOKEN)?.value;
  if (token) {
    const decodedToken = parseJwt(token);
    console.log(decodedToken)
    return {
      expires: decodedToken.exp,
      user: {
        id: decodedToken.sub
      },
    };
  }
};

export const verifyAuth = async (token?: string) => {
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